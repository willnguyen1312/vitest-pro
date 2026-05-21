/**
 * Minimal simulation of `@shopify-internal/graphql-testing`'s `resolveAll`
 * draining behaviour with Apollo Client's mutation flow.
 *
 * Demonstrates the question:
 *   Why does `mutate({refetchQueries, awaitRefetchQueries: true})` need only ONE
 *   `resolveAllGraphQL()` call to drain mutation + refetch, but a manual
 *   `await mutate(); await query();` chain needs TWO?
 *
 * The whole thing is built on native Promises only — no Apollo, no
 * zen-observable, no mocking framework. The microtask scheduling is the actual
 * scheduling. The tests assert on the exact race condition we traced in the
 * BatchedOrders PR.
 *
 * --- TUNING NOTES ---
 *
 * Two parameters control whether the simulation reproduces the real behaviour
 * we see in admin-web tests:
 *
 *   1. APOLLO_CHAIN_DEPTH: how many microtask hops sit between the
 *      mock-link mutex resolving and the user-facing promise resolving.
 *      Real Apollo: roughly 3–5 (asyncMap's promiseQueue chain + subscriber.next
 *      + the outer `await client.mutate()`). We use 4 — the smallest depth where
 *      the handler's `await mutate` continuation reliably runs AFTER the
 *      while-loop check inside resolveAll (and therefore the second op in a
 *      manual chain doesn't get drained in the same call).
 *
 *   2. RESOLVE_ALL_GRAPHQL_POSTAMBLE_AWAITS: how many extra `await` boundaries
 *      sit between the inner drain returning and the test's assertion. Real
 *      `wrapper.resolveAllGraphQL` has several (resolveAction + resolveLoader
 *      pre-ambles + Promise.all of clients + the test's own `await`). We use 4
 *      — enough microtask budget for the handler's post-mutate continuation
 *      (including the addApolloChainDepth cascade for refetch results) to fire
 *      before the test's assertion runs.
 */
import {describe, expect, test, vi} from 'vitest';

const APOLLO_CHAIN_DEPTH = 4;
const RESOLVE_ALL_GRAPHQL_POSTAMBLE_AWAITS = 4;

// ─── 1. The fake "link" ────────────────────────────────────────────────────
//
// Mirrors what InflightLink + MockLink do in graphql-testing: every operation
// that enters the link is added to `pendingRequests` SYNCHRONOUSLY. The
// operation's outer promise resolves only when the test calls
// `request.resolve(result)`.

interface PendingRequest<T = unknown> {
  name: string;
  resolve: (result: T) => void;
  promise: Promise<T>;
}

function createLink() {
  const pendingRequests = new Set<PendingRequest>();

  function request<T>(name: string): Promise<T> {
    let resolveFn!: (result: T) => void;
    const promise = new Promise<T>((res) => {
      resolveFn = res;
    });

    const req: PendingRequest<T> = {
      name,
      promise,
      resolve: (result) => {
        pendingRequests.delete(req as PendingRequest);
        resolveFn(result);
      },
    };

    pendingRequests.add(req as PendingRequest);
    return promise;
  }

  return {pendingRequests, request};
}

// ─── 2. The fake "Apollo client" ───────────────────────────────────────────
//
// IMPORTANT — chain depth matters. Apollo doesn't resolve the user-facing
// mutate/query promise directly from the link's `.then(next)`. The result
// flows through `asyncMap` → `promiseQueue.then(both, both).then(...)` →
// cache write → `subscriber.next` → outer promise. Each step is a separate
// microtask. We simulate that with `addApolloChainDepth(...)`.
//
// Without this depth, every test would drain in one call regardless — which
// is NOT what the real Apollo flow does, and contradicts the user-observed
// behaviour in admin-web that "manual await mutate(); await query() fails
// 100% with one resolveAllGraphQL".

function addApolloChainDepth<T>(p: Promise<T>): Promise<T> {
  let chained = p;
  for (let i = 0; i < APOLLO_CHAIN_DEPTH; i++) {
    chained = chained.then((v) => v);
  }
  return chained;
}

interface MutateOptions {
  refetchQueries?: string[];
  awaitRefetchQueries?: boolean;
}

function createClient(link: ReturnType<typeof createLink>) {
  function query<T = string>(name: string): Promise<T> {
    return addApolloChainDepth(link.request<T>(name));
  }

  function mutate(
    name: string,
    {refetchQueries = [], awaitRefetchQueries = false}: MutateOptions = {},
  ): Promise<string> {
    // The `.then` is attached SYNCHRONOUSLY on the link request, mirroring
    // Apollo's InflightLink-subscribed observer. Inside, refetches are
    // dispatched in the same microtask that received the mutation result.
    // This is the critical difference vs the manual-await case.
    const afterLink = link.request<string>(name).then((result) => {
      const refetchPromises = refetchQueries.map((q) =>
        link.request<string>(q),
      );
      if (awaitRefetchQueries) {
        return Promise.all(refetchPromises).then(() => result);
      }
      return result;
    });
    return addApolloChainDepth(afterLink);
  }

  return {query, mutate};
}

// ─── 3. resolveAll — the while-loop drain ──────────────────────────────────
//
// Mirrors `GraphQL.resolveAll` from graphql-testing exactly:
//
//   async resolveAll() {
//     await this.resolveNext();
//     while (this.getMatchingRequests().length > 0) {
//       await this.resolveNext();
//     }
//   }

async function resolveAll(link: ReturnType<typeof createLink>) {
  async function resolveNext() {
    const requests = [...link.pendingRequests];
    await Promise.all(
      requests.map((req) => {
        req.resolve(`${req.name}-result`);
        return req.promise;
      }),
    );
  }

  await resolveNext();
  while (link.pendingRequests.size > 0) {
    await resolveNext();
  }
}

// ─── 4. resolveAllGraphQL — what tests actually call ───────────────────────
//
// Mirrors `wrapper.resolveAllGraphQL` from admin-web's mount helpers, which
// wraps `resolveAll` with a handful of extra `await` boundaries
// (`router.resolveAction`, `router.resolveLoader`, `Promise.all(clients...)`).
// Each boundary is a microtask, giving the handler's await continuations a
// chance to run AFTER the drain exits but BEFORE the test's assertion.

async function resolveAllGraphQL(link: ReturnType<typeof createLink>) {
  await resolveAll(link);
  for (let i = 0; i < RESOLVE_ALL_GRAPHQL_POSTAMBLE_AWAITS; i++) {
    await Promise.resolve();
  }
}

// ─── 5. Tests ──────────────────────────────────────────────────────────────

describe('resolveAllGraphQL drain semantics', () => {
  test('mutate + refetchQueries: ONE call drains both ops AND the post-mutation continuation', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    // Application code shape: matches BatchedOrders's `moveItemsToBatch`.
    async function handler() {
      await client.mutate('MoveItems', {
        refetchQueries: ['BatchDetail'],
        awaitRefetchQueries: true,
      });
      flash('moved');
    }

    void handler();
    expect([...link.pendingRequests].map((r) => r.name)).toEqual(['MoveItems']);

    await resolveAllGraphQL(link);

    // After ONE drain: both ops drained AND flash has been called.
    // Refetch was dispatched synchronously inside mutate's `.then(result =>
    // ...)`, so it was in pendingRequests when resolveAll's while-loop
    // checked. The loop iterated and drained it in the same call.
    expect(link.pendingRequests.size).toBe(0);
    expect(flash).toHaveBeenCalledWith('moved');
  });

  test('manual await mutate(); await query(): ONE call is NOT enough — flash never fires', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    async function handler() {
      await client.mutate('MoveItems');
      // The query is dispatched AFTER `await mutate` resumes — in the handler's
      // continuation microtask, which runs LATER than the while-loop check
      // inside resolveAll. By then, the drain has already exited.
      await client.query('BatchDetail');
      flash('moved');
    }

    void handler();

    await resolveAllGraphQL(link);

    // After ONE drain: mutation drained, BUT BatchDetail is now pending
    // (dispatched in the handler's continuation, AFTER the while-loop exited).
    // flash NOT called because the handler is still suspended on `await query`.
    expect([...link.pendingRequests].map((r) => r.name)).toEqual([
      'BatchDetail',
    ]);
    expect(flash).not.toHaveBeenCalled();
  });

  test('manual await mutate(); await query(): TWO calls fully drain and fire flash', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    async function handler() {
      await client.mutate('MoveItems');
      await client.query('BatchDetail');
      flash('moved');
    }

    void handler();

    await resolveAllGraphQL(link); // drains mutation
    await resolveAllGraphQL(link); // drains query, handler resumes, flash fires

    expect(link.pendingRequests.size).toBe(0);
    expect(flash).toHaveBeenCalledWith('moved');
  });

  test('parallel Promise.all of two queries: ONE call is enough (no await between dispatches)', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    async function handler() {
      const [a, b] = await Promise.all([client.query('A'), client.query('B')]);
      flash(`${a}+${b}`);
    }

    void handler();
    // Both A and B are dispatched synchronously when Promise.all evaluates its
    // argument array. No await boundary between them.
    expect([...link.pendingRequests].map((r) => r.name).sort()).toEqual([
      'A',
      'B',
    ]);

    await resolveAllGraphQL(link);

    expect(link.pendingRequests.size).toBe(0);
    expect(flash).toHaveBeenCalledWith('A-result+B-result');
  });

  test('sequential await query(A); await query(B): TWO calls required', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    async function handler() {
      await client.query('A');
      await client.query('B');
      flash('done');
    }

    void handler();
    expect([...link.pendingRequests].map((r) => r.name)).toEqual(['A']);

    await resolveAllGraphQL(link);
    expect([...link.pendingRequests].map((r) => r.name)).toEqual(['B']);
    expect(flash).not.toHaveBeenCalled();

    await resolveAllGraphQL(link);
    expect(link.pendingRequests.size).toBe(0);
    expect(flash).toHaveBeenCalledWith('done');
  });

  test('three sequential awaits: THREE calls required (one per await boundary)', async () => {
    const link = createLink();
    const client = createClient(link);
    const flash = vi.fn();

    async function handler() {
      await client.mutate('M1');
      await client.mutate('M2');
      await client.query('Q');
      flash('done');
    }

    void handler();

    await resolveAllGraphQL(link);
    expect(flash).not.toHaveBeenCalled();

    await resolveAllGraphQL(link);
    expect(flash).not.toHaveBeenCalled();

    await resolveAllGraphQL(link);
    expect(flash).toHaveBeenCalledWith('done');
  });

  test('the rule: drain count = number of await-gated dispatches in the application code', async () => {
    // Two equivalent business flows (mutate + side-effect query). The drain
    // count depends entirely on whether the second op is dispatched
    // synchronously inside the mutation's .then chain or behind a user-code
    // await. That's the only difference that matters.

    const linkA = createLink();
    const clientA = createClient(linkA);
    const flashA = vi.fn();

    async function handlerWithRefetch() {
      await clientA.mutate('M', {
        refetchQueries: ['Q'],
        awaitRefetchQueries: true,
      });
      flashA('done');
    }
    void handlerWithRefetch();
    await resolveAllGraphQL(linkA);
    expect(flashA).toHaveBeenCalledWith('done'); // 1 drain ✓

    const linkB = createLink();
    const clientB = createClient(linkB);
    const flashB = vi.fn();

    async function handlerManual() {
      await clientB.mutate('M');
      await clientB.query('Q');
      flashB('done');
    }
    void handlerManual();
    await resolveAllGraphQL(linkB);
    expect(flashB).not.toHaveBeenCalled(); // 1 drain ✗

    await resolveAllGraphQL(linkB);
    expect(flashB).toHaveBeenCalledWith('done'); // 2 drains ✓
  });
});
