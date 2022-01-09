import { join } from "path";
import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostic } from "./utils";

test("`compilerOptions.lib` in nearest `tsconfig.json`", () => {
  const { configDiagnostics, tsdResults } = tsd(
    fixturePath("compilerOptions-lib")
  );

  expect(configDiagnostics).toBeUndefined();
  expect(tsdResults).toHaveLength(0);
});

test("`compilerOptions.strict` in nearest `tsconfig.json`", () => {
  const { configDiagnostics, tsdResults } = tsd(
    fixturePath("compilerOptions-strict")
  );

  expect(configDiagnostics).toBeUndefined();
  expect(tsdResults).toHaveLength(0);
});

test("when parsing `tsconfig.json` returns errors", () => {
  const { assertionCount, configDiagnostics, tsdResults } = tsd(
    fixturePath("compilerOptions-errors")
  );

  expect(normalizeDiagnostic(configDiagnostics)).toMatchObject([
    {
      file: {
        fileName: join(__dirname, "compilerOptions-errors", "tsconfig.json"),
      },
      message:
        "Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node12', 'nodenext'.",
      line: 3,
      character: 15,
    },
    {
      message: "Compiler option 'strict' requires a value of type boolean.",
      line: 5,
      character: 15,
    },
    {
      file: undefined,
      message: expect.stringContaining("No inputs were found in config file"),
      line: undefined,
      character: undefined,
    },
  ]);

  expect(assertionCount).toBe(0);
  expect(tsdResults).toHaveLength(0);
});
