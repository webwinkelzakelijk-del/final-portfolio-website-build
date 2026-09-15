import test from "node:test";
import assert from "node:assert/strict";
import { authorized } from "../inbox.mjs";

test("inbox is closed without a strong configured password and exact credentials", () => {
  const password = "this-is-a-long-test-password";
  const header = "Basic " + Buffer.from("kevin:" + password).toString("base64");
  assert.equal(authorized(header, undefined), false);
  assert.equal(authorized(header, "short"), false);
  assert.equal(authorized(header, password), true);
  assert.equal(authorized(header, password + "no"), false);
  assert.equal(authorized("Basic broken", password), false);
});
