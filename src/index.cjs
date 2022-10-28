/**
 * @param {Object} eleventyConfig
 * @param {Object} pluginOptions
 * @param {Array.<String>} pluginOptions.markdownTransforms
 * @param {Array.<String>} [pluginOptions.htmlTransforms]
 * @param {String} [pluginOptions.transformsDirectory]
 */
function EleventyUnifiedPlugin(
  eleventyConfig,
  { markdownTransforms, htmlTransforms, transformsDirectory } = {}
) {
  if (markdownTransforms instanceof Array && markdownTransforms.length) {
    eleventyConfig.setLibrary("md", {
      disable: () => {}, // Broken in 2.0.0 canary https://github.com/11ty/eleventy/issues/2613
      render: async (content, pageContext) => {
        const { default: render } = await import("./remark.js");
        return render(content, {
          transformsDirectory,
          markdownTransforms,
          pageContext,
          eleventyConfig,
        });
      },
    });
  }
  if (htmlTransforms instanceof Array && htmlTransforms.length) {
    eleventyConfig.addTransform(
      "eleventy-plugin-unified",
      async function (content) {
        const pageContext = this;
        if (
          !pageContext.outputPath ||
          !pageContext.outputPath.endsWith(".html")
        ) {
          return content;
        }
        const { default: render } = await import("./rehype.js");
        return render(content, {
          htmlTransforms,
          transformsDirectory,
          pageContext,
          eleventyConfig,
        });
      }
    );
  }
}

module.exports = EleventyUnifiedPlugin;
