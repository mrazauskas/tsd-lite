import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath, normalizeResults } from "./utils";

test("expectDeprecated", () => {
  const { tsdResults } = tsd(fixturePath("expectDeprecated"));

  expect(normalizeResults(tsdResults)).toMatchObject([
    {
      message:
        "Expected '(foo: number, bar: number): number' to be marked deprecated",
      line: 6,
      character: 1,
    },
    {
      message: "Expected 'Options.delimiter' to be marked deprecated",
      line: 15,
      character: 1,
    },
    {
      message: "Expected 'Unicorn.RAINBOW' to be marked deprecated",
      line: 19,
      character: 1,
    },
    {
      message: "Expected 'RainbowClass' to be marked deprecated",
      line: 34,
      character: 1,
    },
  ]);
});

test("expectNotDeprecated", () => {
  const { tsdResults } = tsd(fixturePath("expectNotDeprecated"));

  expect(normalizeResults(tsdResults)).toMatchObject([
    {
      message:
        "Expected '(foo: string, bar: string): string' to not be marked deprecated",
      line: 5,
      character: 1,
    },
    {
      message: "Expected 'Options.separator' to not be marked deprecated",
      line: 14,
      character: 1,
    },
    {
      message: "Expected 'Unicorn.UNICORN' to not be marked deprecated",
      line: 18,
      character: 1,
    },
    {
      message: "Expected 'UnicornClass' to not be marked deprecated",
      line: 33,
      character: 1,
    },
  ]);
});
