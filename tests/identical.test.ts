import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectType", () => {
  const { diagnostics } = tsd(fixturePath("expectType"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Parameter type 'any' is not identical to argument type 'number'.",
      start: 196,
    },
    {
      messageText:
        "Parameter type 'string | number' is declared too wide for argument type 'string'.",
      start: 227,
    },
    {
      messageText:
        "Parameter type 'false' is not identical to argument type 'any'.",
      start: 287,
    },
    {
      messageText:
        "Parameter type 'string' is declared too wide for argument type 'never'.",
      start: 328,
    },
    {
      messageText:
        "Parameter type 'any' is declared too wide for argument type 'never'.",
      start: 361,
    },
  ]);
});

test("expectNotType", () => {
  const { diagnostics } = tsd(fixturePath("expectNotType"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Parameter type 'string' is identical to argument type 'string'.",
      start: 222,
    },
    {
      messageText: "Parameter type 'any' is identical to argument type 'any'.",
      start: 327,
    },
  ]);
});
