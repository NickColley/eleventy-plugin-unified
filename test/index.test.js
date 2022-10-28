import test from "ava";
import index from "../src/index.cjs";

test("is a function", (assert) => {
  assert.is(typeof index, "function");
});

test("setLibrary › renders markdown", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      setLibrary: async (type, { render }) => {
        assert.is(
          await render("# Hello, world"),
          '<h1 id="hello-world">Hello, world</h1>'
        );
        resolve();
      },
    };
    index(eleventyConfig, { markdownTransforms: ["remark-slug"] });
  });
});

// Broken in 2.0.0 canary https://github.com/11ty/eleventy/issues/2613
test("setLibrary › disables broken method", (assert) => {
  assert.plan(1);
  const eleventyConfig = {
    setLibrary: (type, { disable }) => {
      assert.is(disable(), undefined);
    },
  };
  index(eleventyConfig, { markdownTransforms: ["remark-slug"] });
});

test("addTransform › does nothing to regular content", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      addTransform: async (type, render) => {
        assert.is(await render("# Hello, world"), "# Hello, world");
        resolve();
      },
    };
    index(eleventyConfig, { htmlTransforms: ["rehype-format"] });
  });
});

test("addTransform › parses and renders html", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      addTransform: async (type, render) => {
        const context = { inputPath: "index.md", outputPath: "index.html" };
        assert.is(
          await render.call(context, "<h1>Hello, world</h1>"),
          `
<html>
  <head></head>
  <body>
    <h1>Hello, world</h1>
  </body>
</html>
`
        );
        resolve();
      },
    };
    index(eleventyConfig, { htmlTransforms: ["rehype-format"] });
  });
});

test("addTransform › duplicate words are reported via retext", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      addTransform: async (type, render) => {
        const context = { inputPath: "index.md", outputPath: "index.html" };
        await render.call(context, "<p>and and</p>");
      },
    };
    index(eleventyConfig, {
      reporter: (file) => {
        assert.is(file.messages[0].message, "Expected `and` once, not twice");
        resolve();
      },
      textTransforms: ["retext-repeated-words"],
    });
  });
});