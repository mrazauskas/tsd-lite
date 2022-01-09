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
