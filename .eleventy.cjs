const plugin = require("./src/index.cjs");

/**
 * @param {Object} eleventyConfig
 * @param {Object|Array.<String>} pluginOptions
 */
module.exports = function EleventyPluginUnified(eleventyConfig, pluginOptions) {
  if (pluginOptions instanceof Array) {
    pluginOptions = { markdownTransforms: pluginOptions };
  }
  return plugin(eleventyConfig, pluginOptions);
};
