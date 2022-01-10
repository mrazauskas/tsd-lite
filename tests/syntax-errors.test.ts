import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeErrors } from "./utils";

test("syntax errors", () => {
  const { tsdErrors, tsdResults } = tsd(fixturePath("syntax-errors"));

  expect(tsdResults).toHaveLength(0);

  expect(normalizeErrors(tsdErrors)).toMatchObject([
    {
      message: "')' expected.",
      line: 4,
      character: 30,
    },
    {
      message: "',' expected.",
      line: 5,
      character: 23,
    },
  ]);
});
