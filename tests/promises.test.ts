import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("promises", () => {
  const { diagnostics } = tsd(fixturePath("promises"));

  expect(diagnostics).toHaveLength(0);
});
