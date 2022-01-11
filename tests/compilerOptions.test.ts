import { join, normalize } from "path";
import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeErrors } from "./utils";

test("`compilerOptions.lib` in nearest `tsconfig.json`", () => {
  const { tsdErrors, tsdResults } = tsd(fixturePath("compilerOptions-lib"));

  expect(tsdErrors).toBeUndefined();
  expect(tsdResults).toHaveLength(0);
});

test("`compilerOptions.strict` in nearest `tsconfig.json`", () => {
  const { tsdErrors, tsdResults } = tsd(fixturePath("compilerOptions-strict"));

  expect(tsdErrors).toBeUndefined();
  expect(tsdResults).toHaveLength(0);
});

test("when parsing `tsconfig.json` returns errors", () => {
  const { assertionsCount, tsdErrors, tsdResults } = tsd(
    fixturePath("compilerOptions-errors")
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(normalize(tsdErrors![0].file!.fileName)).toEqual(
    join(__dirname, "compilerOptions-errors", "tsconfig.json")
  );

  expect(normalizeErrors(tsdErrors)).toMatchObject([
    {
      message: expect.stringMatching(/^Argument for '--module' option must/),
      line: 3,
      character: 15,
    },
    {
      message: "Compiler option 'strict' requires a value of type boolean.",
      line: 5,
      character: 15,
    },
    {
      message: expect.stringMatching(/^No inputs were found in config file/),
      file: undefined,
    },
  ]);

  expect(assertionsCount).toBe(0);
  expect(tsdResults).toHaveLength(0);
});
