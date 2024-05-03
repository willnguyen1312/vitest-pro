export function sum(a: number, b: number): number {
  return a + b;
}

export default class User {
  constructor(private name: string) {}

  getName() {
    return this.name;
  }
}
