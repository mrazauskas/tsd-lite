import { resolve } from "path";

export const fixturePath = (fixture: string): string =>
  resolve("tests", fixture, "index.test.ts");
