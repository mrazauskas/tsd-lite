import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeDiagnostics } from "./utils";

test("expectAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectAssignable"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message:
        "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
      line: 10,
      character: 27,
    },
  ]);
});

test("expectNotAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectNotAssignable"));

  expect(normalizeDiagnostics(diagnostics)).toMatchObject([
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'string | number'.",
      line: 6,
      character: 1,
    },
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'any'.",
      line: 7,
      character: 1,
    },
  ]);
});
