import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("`compilerOptions.lib` in nearest `tsconfig.json`", () => {
  const { tsdResults } = tsd(fixturePath("compilerOptions-lib"));

  expect(tsdResults).toHaveLength(0);
});

test("`compilerOptions.strict` in nearest `tsconfig.json`", () => {
  const { tsdResults } = tsd(fixturePath("compilerOptions-strict"));

  expect(tsdResults).toHaveLength(0);
});

test("`compilerOptions.exactOptionalPropertyTypes` in nearest `tsconfig.json`", () => {
  const { tsdResults } = tsd(
    fixturePath("compilerOptions-exactOptionalPropertyTypes")
  );

  expect(tsdResults).toHaveLength(0);
});

test("when parsing `tsconfig.json` returns errors", () => {
  expect(() => {
    tsd(fixturePath("compilerOptions-errors"));
  }).toThrow("Compiler option 'strict' requires a value of type boolean.");
});
