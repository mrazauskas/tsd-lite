import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectError", () => {
  const { diagnostics } = tsd(fixturePath("expectError"));

  expect(diagnostics).toMatchObject([
    {
      line: 18,
      column: 1,
      message: "Expected an error, but found none.",
    },
    {
      line: 89,
      column: 1,
      message: "Expected an error, but found none.",
    },
  ]);
});
