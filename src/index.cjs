/**
 * @param {Object} eleventyConfig
 * @param {Object} pluginOptions
 * @param {Array.<String>} pluginOptions.markdownTransforms
 * @param {Array.<String>} [pluginOptions.htmlTransforms]
 * @param {Array.<String>} [pluginOptions.textParser] retext parser, defaults to retext-english
 * @param {Array.<String>} [pluginOptions.textParser] retext parser, defaults to retext-english
 * @param {String} [pluginOptions.transformsDirectory]
 */
function EleventyUnifiedPlugin(
  eleventyConfig,
  {
    markdownTransforms,
    htmlTransforms,
    textTransforms,
    textParser,
    reporter,
    transformsDirectory,
  } = {}
) {
  const hasMarkdownTransforms =
    markdownTransforms instanceof Array && markdownTransforms.length > 0;
  const hasHtmlTransforms =
    htmlTransforms instanceof Array && htmlTransforms.length > 0;
  const hasTextTransforms =
    textTransforms instanceof Array && textTransforms.length > 0;
  if (hasMarkdownTransforms) {
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
  if (hasHtmlTransforms || hasTextTransforms) {
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
          textTransforms,
          textParser,
          reporter,
          transformsDirectory,
          pageContext,
          eleventyConfig,
        });
      }
    );
  }
}

module.exports = EleventyUnifiedPlugin;
