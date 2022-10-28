const test = require("ava");
const proxyquire = require("proxyquire");

const main = proxyquire("../.eleventy.cjs", {
  "./src/index.cjs": (...args) => {
    return args;
  },
});

test("is a function", (assert) => {
  assert.is(typeof main, "function");
});

test("passes through eleventyConfig and options to main plugin", (assert) => {
  const eleventyConfig = { inputPath: "./Home.md" };
  const options = {
    transformDirectory: "./plugins",
    markdownTransforms: ["remark-slug"],
  };
  assert.deepEqual(main(eleventyConfig, options), [eleventyConfig, options]);
});

test("defaults an array input to markdownTransform option", async (assert) => {
  const eleventyConfig = { inputPath: "./Home.md" };
  const options = ["remark-slug"];
  assert.deepEqual(main(eleventyConfig, options), [
    eleventyConfig,
    { markdownTransforms: options },
  ]);
});
