const test = require("ava");
const Eleventy = require("@11ty/eleventy");
const EleventyUnifiedPlugin = require("../../../.eleventy.cjs");

test("builds with all the bells and whistles", async (assert) => {
  assert.plan(2);
  const reporter = (file) => {
    const message = file?.messages[0].message;
    assert.is(message, "Expected `end` once, not twice");
  };
  const eleventy = new Eleventy(__dirname, "_site", {
    config: function (eleventyConfig) {
      eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
        transformsDirectory: "./test/smoke/all-config/plugins",
        markdownTransforms: ["_aria-current-links.js", "remark-slug"],
        htmlTransforms: ["rehype-format"],
        textTransforms: ["retext-repeated-words"],
        textParser: "retext-english",
        reporter,
      });
    },
  });
  const pages = await eleventy.toJSON();
  const page = pages.map((page) => page.content).find((content) => content);
  const output = `
<html>
  <head></head>
  <body>
    <h1 id="hello-world">Hello, world</h1>
    <p>This is for an end end to end test.</p>
    <h2 id="another-heading">Another heading</h2>
    <p><a href="https://twitter.com/NickColley">External link</a></p>
    <p><a href="/another-page">Internal link</a></p>
    <p><a href="/about" aria-current="true">Current page link</a></p>
  </body>
</html>
`;
  assert.deepEqual(page, output);
});
