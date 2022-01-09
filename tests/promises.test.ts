import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("promises", () => {
  const { tsdResults } = tsd(fixturePath("promises"));

  expect(tsdResults).toHaveLength(0);
});
