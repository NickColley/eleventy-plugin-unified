const plugin = require("./src/index.cjs");

module.exports = function EleventyPluginUnified(
  eleventyConfig,
  pluginOptions = {}
) {
  plugin(eleventyConfig, pluginOptions);
};
