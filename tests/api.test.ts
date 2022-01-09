import { normalize, resolve } from "path";
import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostics } from "./utils";

test("returns `ts.SourceFile` object", () => {
  const { diagnostics } = tsd(fixturePath("failing"));

  expect(diagnostics).toHaveLength(2);
  expect(normalize(diagnostics[0].file.fileName)).toEqual(
    resolve("tests", "failing", "index.test.ts")
  );

  expect(diagnostics[0].file.text).toEqual(diagnostics[1].file.text);
  expect(diagnostics[0].file.text).toMatchInlineSnapshot(`
    "import { expectError, expectType } from \\"../../\\";
    import { makeDate } from \\".\\";

    expectType<Date>(makeDate(12345678));
    expectType<string>(makeDate(5, 5, 5));

    expectError(makeDate(1, 3, 6));
    expectError(makeDate(1, 3));
    "
  `);
});

test("returns `assertionCount`", () => {
  const { assertionCount } = tsd(fixturePath("failing"));

  expect(assertionCount).toBe(4);
});

test("passing", () => {
  const { diagnostics } = tsd(fixturePath("passing"));

  expect(diagnostics).toHaveLength(0);
});

test("failing", () => {
  const { diagnostics } = tsd(fixturePath("failing"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message:
        "Argument of type 'Date' is not assignable to parameter of type 'string'.",
      line: 5,
      character: 20,
    },
    {
      message: "Expected an error, but found none.",
      line: 7,
      character: 1,
    },
  ]);
});

test("failing-nested", () => {
  const { diagnostics } = tsd(fixturePath("failing-nested"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      file: {
        fileName: expect.stringContaining("index.test.ts"),
      },
      message:
        "Argument of type 'number' is not assignable to parameter of type 'string'.",
      line: 6,
      character: 20,
    },
    {
      file: {
        fileName: expect.stringContaining("nested.ts"),
      },
      message:
        "Argument of type 'number' is not assignable to parameter of type 'string'.",
      line: 5,
      character: 20,
    },
  ]);
});
