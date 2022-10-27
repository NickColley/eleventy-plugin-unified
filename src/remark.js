import { unified } from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";

import importPlugins from "./import-plugins.js";

export default async function (
  markdown,
  { markdownTransforms, transformsDirectory, pageContext, eleventyConfig }
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
