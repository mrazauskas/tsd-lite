import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("syntax errors", () => {
  expect(() => {
    tsd(fixturePath("syntax-errors"));
  }).toThrow("')' expected.");
});
