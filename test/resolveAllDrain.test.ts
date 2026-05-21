/**
 * Why does `mutate + refetchQueries` drain in 1 call, but a manual
 * `await mutate(); await query();` chain need 2?
 *
 * The simulation: a mock GraphQL link (pending requests, manual resolve), a
 * macrotask boundary between mutex-resolve and user-facing promise resolve
 * (modelling Apollo's internal asyncMap → cache → subscriber.next chain), and
 * `resolveAll`'s while-loop drain. Native promises + setTimeout only.
 */
import {expect, test} from 'vitest';

function createLink() {
  const pending = new Set<{
    name: string;
    promise: Promise<string>;
    resolve: () => void;
  }>();
  return {
    pending,
    request(name: string) {
      let resolve!: () => void;
      const promise = new Promise<string>(
        (r) => (resolve = () => r(`${name}-result`)),
      );
      const req = {
        name,
        promise,
        resolve: () => {
          pending.delete(req);
          resolve();
        },
      };
      pending.add(req);
      return promise;
    },
  };
}

// Apollo wraps the link result in asyncMap → cache → subscriber.next before
// the user-facing promise resolves. The defining property is that user-facing
// resolution lands AFTER the microtask cascade triggered by the mutex resolving.
// A macrotask boundary captures this exactly: setTimeout(0) only fires after
// the microtask queue fully drains, so it deterministically pushes user-facing
// resolution past resolveAll's while-loop check (which lives in the microtask
// drain) — no tuned chain-depth constant required.
const chain = <T>(p: Promise<T>): Promise<T> =>
  p.then((v) => new Promise<T>((r) => setTimeout(() => r(v))));

// Apollo's resolveAll: while-loop drains pending requests until empty. The
// trailing macrotask boundary lets any deferred user-facing resolutions and
// their handler continuations finish before the test asserts.
async function resolveAll(link: ReturnType<typeof createLink>) {
  while (link.pending.size > 0) {
    await Promise.all([...link.pending].map((r) => (r.resolve(), r.promise)));
  }
  await new Promise<void>((r) => setTimeout(r));
}

test("refetchQueries: refetch dispatched inside mutate's .then → 1 drain", async () => {
  const link = createLink();
  let done = false;

  // The refetch is dispatched in the SAME microtask that handles the mutation
  // result. By the time resolveAll's while-loop checks `pending`, the refetch
  // is already there, so the loop iterates and drains it in the same call.
  chain(link.request('M').then(() => link.request('Q'))).then(
    () => (done = true),
  );

  await resolveAll(link);
  expect(done).toBe(true);
});

test('manual await mutate; await query: query dispatched in handler continuation → 2 drains', async () => {
  const link = createLink();
  let done = false;

  // The query is dispatched AFTER `await mutate` resumes — and `await mutate`
  // only resumes on a macrotask (per `chain` above), which is strictly later
  // than the while-loop check. So the first drain sees empty `pending` and
  // exits. The query is dispatched after the drain returns, requiring a
  // second drain to resolve.
  void (async () => {
    await chain(link.request('M'));
    await chain(link.request('Q'));
    done = true;
  })();

  await resolveAll(link);
  expect(done).toBe(false);
  expect([...link.pending].map((r) => r.name)).toEqual(['Q']);

  await resolveAll(link);
  expect(done).toBe(true);
});
