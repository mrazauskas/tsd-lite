import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectType", () => {
  const { diagnostics } = tsd(fixturePath("expectType"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Parameter type 'any' is not identical to argument type 'number'.",
      line: 9,
      column: 1,
    },
    {
      message:
        "Parameter type 'string | number' is declared too wide for argument type 'string'.",
      line: 10,
      column: 1,
    },
    {
      message:
        "Parameter type 'false' is not identical to argument type 'any'.",
      line: 12,
      column: 1,
    },
    {
      message:
        "Parameter type 'string' is declared too wide for argument type 'never'.",
      line: 14,
      column: 1,
    },
    {
      message:
        "Parameter type 'any' is declared too wide for argument type 'never'.",
      line: 15,
      column: 1,
    },
  ]);
});

test("expectNotType", () => {
  const { diagnostics } = tsd(fixturePath("expectNotType"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Parameter type 'string' is identical to argument type 'string'.",
      line: 9,
      column: 1,
    },
    {
      message: "Parameter type 'any' is identical to argument type 'any'.",
      line: 12,
      column: 1,
    },
  ]);
});
