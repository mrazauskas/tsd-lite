import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostics } from "./utils";

test("syntax errors", () => {
  const { diagnostics } = tsd(fixturePath("syntax-errors"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
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
    {
      message: "Expected an error, but found none.",
      line: 4,
      character: 1,
    },
    {
      message: "Expected an error, but found none.",
      line: 5,
      character: 1,
    },
  ]);
});
