import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import importPlugins from "./import-plugins.js";

export default async function (
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
