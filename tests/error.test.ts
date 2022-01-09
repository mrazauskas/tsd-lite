import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectError", () => {
  const { diagnostics } = tsd(fixturePath("expectError"));

  expect(diagnostics).toMatchObject([
    {
      messageText: "Expected an error, but found none.",
      start: 332,
    },
    {
      messageText: "Expected an error, but found none.",
      start: 1518,
    },
  ]);
});
