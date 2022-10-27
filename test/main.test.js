import test from "ava";
import main from "../.eleventy.cjs";

test("is a function", (assert) => {
  assert.is(typeof main, "function");
});

test("calls eleventy functions", (assert) => {
  assert.plan(2);
  const eleventyConfig = {
    setLibrary: () => assert.pass(),
    addTransform: () => assert.pass(),
  };
  main(eleventyConfig);
});
