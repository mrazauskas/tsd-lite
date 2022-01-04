import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("syntax errors", () => {
  const { diagnostics } = tsd(fixturePath("syntax-errors"));

  expect(diagnostics).toMatchObject([
    {
      message: "')' expected.",
      line: 4,
      column: 30,
    },
    {
      message: "',' expected.",
      line: 5,
      column: 23,
    },
    {
      line: 4,
      column: 1,
      message: "Expected an error, but found none.",
    },
    {
      line: 5,
      column: 1,
      message: "Expected an error, but found none.",
    },
  ]);
});
