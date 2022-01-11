import { normalize, resolve } from "path";
import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeResults } from "./utils";

test("returns `ts.SourceFile` object", () => {
  const { tsdResults } = tsd(fixturePath("failing"));

  expect(tsdResults).toHaveLength(2);
  expect(normalize(tsdResults[0].file.fileName)).toEqual(
    resolve("tests", "failing", "index.test.ts")
  );

  expect(tsdResults[0].file.text).toEqual(tsdResults[1].file.text);
  expect(tsdResults[0].file.text).toMatchInlineSnapshot(`
    "import { expectError, expectType } from \\"../../\\";
    import { makeDate } from \\".\\";

    expectType<Date>(makeDate(12345678));
    expectType<string>(makeDate(5, 5, 5));

    expectError(makeDate(1, 3, 6));
    expectError(makeDate(1, 3));
    "
  `);
});

test("returns `assertionsCount`", () => {
  const { assertionsCount } = tsd(fixturePath("failing"));

  expect(assertionsCount).toBe(4);
});

test("passing", () => {
  const { tsdResults } = tsd(fixturePath("passing"));

  expect(tsdResults).toHaveLength(0);
});

test("failing", () => {
  const { tsdResults } = tsd(fixturePath("failing"));

  expect(normalizeResults(tsdResults)).toMatchObject([
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
  const { tsdResults } = tsd(fixturePath("failing-nested"));

  expect(normalizeResults(tsdResults)).toMatchObject([
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
