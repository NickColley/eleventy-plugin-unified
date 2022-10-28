import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import importPlugins from "./import-plugins.js";

/**
 * @param {String} html html
 * @param {Object} pluginOptions
 * @param {Array.<String>} [pluginOptions.htmlTransforms]
 * @param {String} [pluginOptions.transformsDirectory]
 * @param {Object} [pluginOptions.pageContext]
 * @param {Object} [pluginOptions.eleventyConfig]
 * @returns {String} html
 */
export default async function rehype(
  html,
  { htmlTransforms, transformsDirectory, pageContext, eleventyConfig } = {}
) {
  const output = await unified()
    // Turn HTML into HTML AST (hast)
    .use(parse)
    // Apply HTML specific transforms
    .use(await importPlugins(htmlTransforms, transformsDirectory))
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .data({
      pageContext,
      eleventyConfig,
    })
    .process(html);
  return String(output);
}
