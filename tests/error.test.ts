import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostics } from "./utils";

test("expectError", () => {
  const { diagnostics } = tsd(fixturePath("expectError"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message: "Expected an error, but found none.",
      line: 18,
      character: 1,
    },
    {
      message: "Expected an error, but found none.",
      line: 89,
      character: 1,
    },
  ]);
});
