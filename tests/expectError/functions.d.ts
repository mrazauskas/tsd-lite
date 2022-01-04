declare const fone: {
  (foo: string, bar: string): string;
  (foo: number, bar: number): number;
  <T extends string>(foo: T, bar: T): string;
};

export default fone;

export const ftwo: {
  (foo: string): string;
  (foo: string, bar: string, baz: string): string;
};

export const fthree: {
  (foo: "*"): string;
  (foo: "a" | "b"): string;
  (foo: ReadonlyArray<"a" | "b">): string;
  (foo: never): string;
};
