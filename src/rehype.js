import { unified } from "unified";
import parse from "rehype-parse";
import retext from "rehype-retext";
import stringify from "rehype-stringify";
import importPlugins from "./import-plugins.js";

const importIfPath = async (pathOrName) => {
  if (!pathOrName) {
    return;
  }
  if (typeof pathOrName === "function") {
    return pathOrName;
  } else {
    const { default: importedFunction } = await import(pathOrName);
    return importedFunction;
  }
};

/**
 * @param {String} html html
 * @param {Object} pluginOptions
 * @param {Array.<String>} [pluginOptions.htmlTransforms]
 * @param {Array.<String>} [pluginOptions.textTransforms]
 * @param {String|Function} [pluginOptions.textParser]
 * @param {Function} [pluginOptions.reporter]
 * @param {String} [pluginOptions.transformsDirectory]
 * @param {Object} [pluginOptions.pageContext]
 * @param {Object} [pluginOptions.eleventyConfig]
 * @returns {String} html
 */
export default async function rehype(
  html,
  {
    htmlTransforms,
    textTransforms,
    textParser = "retext-english",
    reporter = "vfile-reporter",
    transformsDirectory,
    pageContext,
    eleventyConfig,
  } = {}
) {
  const hasTextTransforms =
    textTransforms instanceof Array && textTransforms.length > 0;
  const retextPlugins = await importPlugins(
    textTransforms,
    transformsDirectory
  );
  const retextParser = await importIfPath(textParser);
  const retextReporter = await importIfPath(reporter);
  const output = await unified()
    // Turn HTML into HTML AST (hast)
    .use(parse)
    // Apply HTML specific transforms
    .use(await importPlugins(htmlTransforms, transformsDirectory))
    .use(retext, unified().use(retextParser).use(retextPlugins))
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .data({
      pageContext,
      eleventyConfig,
    })
    .process(html);

  if (
    hasTextTransforms &&
    typeof retextReporter === "function" &&
    pageContext?.inputPath &&
    output?.messages.length > 0
  ) {
    output.path = pageContext.inputPath;
    const report = retextReporter(output);
    if (typeof report !== "undefined") {
      console.log(report);
    }
  }

  return String(output);
}
