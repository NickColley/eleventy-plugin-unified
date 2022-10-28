const plugin = require("./src/index.cjs");

module.exports = function EleventyPluginUnified(eleventyConfig, pluginOptions) {
  if (pluginOptions instanceof Array) {
    pluginOptions = { markdownTransforms: pluginOptions };
  }
  return plugin(eleventyConfig, pluginOptions);
};
