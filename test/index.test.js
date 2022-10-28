import test from "ava";
import index from "../src/index.cjs";

test("is a function", (assert) => {
  assert.is(typeof index, "function");
});

test("setLibrary › renders markdown", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      setLibrary: async (type, { render }) => {
        assert.is(await render("# Hello, world"), "<h1>Hello, world</h1>");
        resolve();
      },
    };
    index(eleventyConfig, { markdownTransforms: ["remark-parse"] });
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
  index(eleventyConfig, { markdownTransforms: ["remark-parse"] });
});

test("addTransform › does nothing to regular content", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      addTransform: async (type, render) => {
        assert.is(await render("# Hello, world"), "# Hello, world");
        resolve();
      },
    };
    index(eleventyConfig, { htmlTransforms: ["rehype-parse"] });
  });
});

test("addTransform › parses and renders html", async (assert) => {
  await new Promise((resolve) => {
    const eleventyConfig = {
      addTransform: async (type, render) => {
        const context = { outputPath: "index.html" };
        assert.is(
          await render.call(context, "<h1>Hello, world</h1>"),
          "<html><head></head><body><h1>Hello, world</h1></body></html>"
        );
        resolve();
      },
    };
    index(eleventyConfig, { htmlTransforms: ["rehype-parse"] });
  });
});
