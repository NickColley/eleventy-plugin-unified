import test from "ava";
import remark from "../src/remark.js";

test("is a function", (assert) => {
  assert.is(typeof remark, "function");
});

test("parses markdown and renders html", async (assert) => {
  assert.is(await remark("# Hello, world"), "<h1>Hello, world</h1>");
});
