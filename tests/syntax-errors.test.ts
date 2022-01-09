import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("syntax errors", () => {
  const { diagnostics } = tsd(fixturePath("syntax-errors"));

  expect(diagnostics).toMatchObject([
    {
      messageText: "')' expected.",
      start: 87,
    },
    {
      messageText: "',' expected.",
      start: 111,
    },
    {
      messageText: "Expected an error, but found none.",
      start: 58,
    },
    {
      messageText: "Expected an error, but found none.",
      start: 89,
    },
  ]);
});
