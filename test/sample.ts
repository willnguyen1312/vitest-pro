export function doubleImpl(n: number): number {
  return n * 2;
}

export function double(n: number): number {
  return doubleImpl(n);
}
