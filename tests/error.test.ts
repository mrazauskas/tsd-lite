import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeResults } from "./utils";

test("expectError", () => {
  const { tsdResults } = tsd(fixturePath("expectError"));

  expect(normalizeResults(tsdResults)).toMatchObject([
    {
      message: "Expected an error, but found none.",
      line: 94,
      character: 1,
    },
  ]);
});
