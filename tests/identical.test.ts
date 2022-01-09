import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostics } from "./utils";

test("expectType", () => {
  const { diagnostics } = tsd(fixturePath("expectType"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message:
        "Parameter type 'any' is not identical to argument type 'number'.",
      line: 9,
      character: 1,
    },
    {
      message:
        "Parameter type 'string | number' is declared too wide for argument type 'string'.",
      line: 10,
      character: 1,
    },
    {
      message:
        "Parameter type 'false' is not identical to argument type 'any'.",
      line: 12,
      character: 1,
    },
    {
      message:
        "Parameter type 'string' is declared too wide for argument type 'never'.",
      line: 14,
      character: 1,
    },
    {
      message:
        "Parameter type 'any' is declared too wide for argument type 'never'.",
      line: 15,
      character: 1,
    },
  ]);
});

test("expectNotType", () => {
  const { diagnostics } = tsd(fixturePath("expectNotType"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message:
        "Parameter type 'string' is identical to argument type 'string'.",
      line: 9,
      character: 1,
    },
    {
      message: "Parameter type 'any' is identical to argument type 'any'.",
      line: 12,
      character: 1,
    },
  ]);
});
