import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("`compilerOptions.lib` in nearest `tsconfig.json`", () => {
  const { diagnostics } = tsd(fixturePath("compilerOptions-lib"));

  expect(diagnostics).toHaveLength(0);
});

test("`compilerOptions.strict` in nearest `tsconfig.json`", () => {
  const { diagnostics } = tsd(fixturePath("compilerOptions-strict"));

  expect(diagnostics).toHaveLength(0);
});
