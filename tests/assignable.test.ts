import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectAssignable"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
      start: 295,
    },
  ]);
});

test("expectNotAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectNotAssignable"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Argument of type 'string' is assignable to parameter of type 'string | number'.",
      start: 128,
    },
    {
      messageText:
        "Argument of type 'string' is assignable to parameter of type 'any'.",
      start: 188,
    },
  ]);
});
