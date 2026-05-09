/**
 * Practical WeakMap use case: memoize an expensive computation per object,
 * without mutating the object and without leaking memory if the object is
 * eventually garbage-collected.
 *
 * Why WeakMap (and not Map):
 *   - Keys must be objects.
 *   - Holding a key in a WeakMap does NOT prevent GC of that key.
 *   - You can't iterate it — by design — which keeps it leak-safe.
 */
export function memoizeByObject<T extends object, R>(
  fn: (input: T) => R,
): (input: T) => R {
  const cache = new WeakMap<T, R>();

  return (input: T): R => {
    const cached = cache.get(input);
    if (cached !== undefined || cache.has(input)) {
      return cached as R;
    }
    const result = fn(input);
    cache.set(input, result);
    return result;
  };
}

/**
 * Practical WeakMap use case #2: attach private metadata to objects you don't
 * own (e.g. instances passed in from outside) without touching their shape.
 */
export function createViewCounter<T extends object>() {
  const counts = new WeakMap<T, number>();

  return {
    record(item: T): number {
      const next = (counts.get(item) ?? 0) + 1;
      counts.set(item, next);
      return next;
    },
    get(item: T): number {
      return counts.get(item) ?? 0;
    },
  };
}
