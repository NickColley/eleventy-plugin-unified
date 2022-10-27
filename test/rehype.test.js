import test from "ava";
import rehype from "../src/rehype.js";

test("is a function", (assert) => {
  assert.is(typeof rehype, "function");
});

test("parses and renders html", async (assert) => {
  assert.is(
    await rehype("<h1>Hello, world</h1>"),
    "<html><head></head><body><h1>Hello, world</h1></body></html>"
  );
});
