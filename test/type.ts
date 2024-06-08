type A = {
  a: string;
  b?: undefined;
  c: number;
};

type B = {
  b: number;
  a?: undefined;
  c: number;
};

type F = A | B;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type D = {
  d: number;
  f?: number;
};

type D2 = {
  d: number;
  e: number;
  c: number;
};

const takeD = (params: D) => {
  console.log(params);
};

const d2: D2 = {
  d: 1,
  e: 2,
  c: 3,
};

takeD(d2);

const processA = (params: Prettify<F>) => {
  if ("a" in params) {
    console.log(params.c);
    return;
  }

  if ("b" in params) {
    console.log(params.c);
  }
};

processA({
  c: 1,
  b: 1,
});

const callFunc = (func: (arg: 1 | 2 | 3) => void) => {
  func(1);
};

callFunc((arg: number) => {
  console.log(arg);
});
