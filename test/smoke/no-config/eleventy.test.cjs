const test = require("ava");
const Eleventy = require("@11ty/eleventy");
const EleventyUnifiedPlugin = require("../../../.eleventy.cjs");

test("builds with no config without exploding", async (assert) => {
  const eleventy = new Eleventy(__dirname, "_site", {
    config: function (eleventyConfig) {
      eleventyConfig.addPlugin(EleventyUnifiedPlugin);
    },
  });
  const pages = await eleventy.toJSON();
  const html = pages.map((page) => page.content).find((content) => content);
  assert.is(
    html,
    `<h1>Hello, world</h1>
<p>This is for an end end to end test.</p>
<h2>Another heading</h2>
<p><a href="https://twitter.com/NickColley">External link</a></p>
<p><a href="/another-page">Internal link</a></p>
<p><a href="/about">Current page link</a></p>
`
  );
});
