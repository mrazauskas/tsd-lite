import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectAssignable"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
      line: 10,
      column: 27,
    },
  ]);
});

test("expectNotAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectNotAssignable"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'string | number'.",
      line: 6,
      column: 1,
    },
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'any'.",
      line: 7,
      column: 1,
    },
  ]);
});
