import { normalize, resolve } from "path";
import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("returns `fileName`", () => {
  const { diagnostics } = tsd(fixturePath("failing"));

  expect(diagnostics).toHaveLength(2);
  expect(normalize(diagnostics[0].fileName)).toEqual(
    resolve("tests", "failing", "index.test.ts")
  );
});

test("returns `fileText`", () => {
  const { diagnostics } = tsd(fixturePath("failing"));

  expect(diagnostics).toHaveLength(2);
  expect(diagnostics[0].fileText).toEqual(diagnostics[1].fileText);
  expect(diagnostics[0].fileText).toMatchInlineSnapshot(`
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

  expect(diagnostics).toMatchObject([
    {
      message:
        "Argument of type 'Date' is not assignable to parameter of type 'string'.",
      line: 5,
      column: 20,
    },
    {
      message: "Expected an error, but found none.",
      line: 7,
      column: 1,
    },
  ]);
});

test("failing-nested", () => {
  const { diagnostics } = tsd(fixturePath("failing-nested"));

  expect(diagnostics).toMatchObject([
    {
      fileName: expect.stringContaining("index.test.ts"),
      message:
        "Argument of type 'number' is not assignable to parameter of type 'string'.",
      line: 6,
      column: 20,
    },
    {
      fileName: expect.stringContaining("nested.ts"),
      message:
        "Argument of type 'number' is not assignable to parameter of type 'string'.",
      line: 5,
      column: 20,
    },
  ]);
});
