import { parse, format } from "./duration.ts";
import { test } from "node:test";
import assert from "node:assert/strict";
test("roundtrip", () => {
  assert.equal(parse("1h30m"), 5400);
  assert.equal(format(5400), "1h30m");
  assert.equal(format(0), "0s");
});
