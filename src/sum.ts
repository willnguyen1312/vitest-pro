export function sum(a: number, b: number): number {
  return a + b;
}

export default class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User("Nam");
const { name } = user;
console.log(name);
