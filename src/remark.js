import { unified } from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";

import importPlugins from "./import-plugins.js";

/**
 * @param {String} markdown markdown
 * @param {Object} pluginOptions
 * @param {Array.<String>} [pluginOptions.markdownTransforms]
 * @param {String} [pluginOptions.transformsDirectory]
 * @param {Object} [pluginOptions.pageContext]
 * @param {Object} [pluginOptions.eleventyConfig]
 * @returns {String} html
 */
export default async function remark(
  markdown,
  { markdownTransforms, transformsDirectory, pageContext, eleventyConfig } = {}
) {
  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(parse)
    // Apply Markdown transforms
    .use(await importPlugins(markdownTransforms, transformsDirectory))
    // Turn Markdown into HTML syntax tree
    .use(rehype, {
      fragment: true,
    })
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .data({
      pageContext,
      eleventyConfig,
    })
    .process(markdown);

  return String(output);
}
