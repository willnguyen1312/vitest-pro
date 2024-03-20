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
