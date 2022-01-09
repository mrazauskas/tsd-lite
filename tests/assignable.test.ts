import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeResults } from "./utils";

test("expectAssignable", () => {
  const { tsdResults } = tsd(fixturePath("expectAssignable"));

  expect(normalizeResults(tsdResults)).toMatchObject([
    {
      message:
        "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
      line: 10,
      character: 27,
    },
  ]);
});

test("expectNotAssignable", () => {
  const { tsdResults } = tsd(fixturePath("expectNotAssignable"));

  expect(normalizeResults(tsdResults)).toMatchObject([
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
