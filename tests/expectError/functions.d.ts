declare const fOne: {
  (foo: string, bar: string): string;
  (foo: number, bar: number): number;
  <T extends string>(foo: T, bar: T): string;
};

export default fOne;

export const fTwo: {
  (foo: string): string;
  (foo: string, bar: string, baz: string): string;
};

export const fThree: {
  (foo: "*"): string;
  (foo: "a" | "b"): string;
  (foo: ReadonlyArray<"a" | "b">): string;
  (foo: never): string;
};
