# Eleventy Plugin Unified

[![past latest npm version](https://img.shields.io/npm/v/eleventy-plugin-unified.svg)](https://www.npmjs.com/package/eleventy-plugin-unified)

Use the [unified](https://unifiedjs.com/) ecosystem in Eleventy.

You can render, transform and lint:

- markdown with the [remark](https://github.com/remarkjs/remark) ecosystem.
- html with the [rehype](https://github.com/rehypejs/rehype) ecosystem.
- text with the [retext](https://github.com/retextjs/retext) ecosystem.

## Install

```bash
npm install eleventy-plugin-unified remark-slug
```

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, ["remark-slug"]);
};
```

Then with a markdown file with:

```markdown
# Hello, world
```

It will render like this:

```html
<h1 id="hello-world">Hello, world</h1>
```

## Plugin options

| Option              | Description                    | Default          |
| ------------------- | ------------------------------ | ---------------- |
| markdownTransforms  | [remark plugins]               | `[]`             |
| htmlTransforms      | [rehype plugins]               | `[]`             |
| textTransforms      | [retext plugins]               | `[]`             |
| transformsDirectory | directory with your transforms | `"."`            |
| textParser          | retext parser                  | [retext-english] |
| reporter            | [vfile reporter]               | `undefined`      |

[remark plugins]: https://unifiedjs.com/explore/keyword/remark
[rehype plugins]: https://unifiedjs.com/explore/keyword/rehype
[retext plugins]: https://unifiedjs.com/explore/keyword/retext
[retext-english]: https://www.npmjs.com/package/retext-english
[vfile reporter]: https://github.com/vfile/vfile#reporters

## Examples

- [Using page context and eleventy data](./docs/eleventy.md)
- [Transforming markdown with remark](./docs/markdown.md)
- [Transforming html with rehype](./docs/html.md)
- [Reporting and linting with retext](./docs/text.md)

### Configure options for transforms

```javascript
// .eleventy.js
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  htmlTransforms: [["rehype-format", { indent: "\t" }]],
});
```

### Adding your own transforms

```javascript
// .eleventy.js
eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
  "./plugins/responsive-tables.js",
]);
```

or

```javascript
// .eleventy.js
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  transformsDirectory: "./plugins",
  markdownTransforms: ["responsive-tables.js"],
});
```

## Acknowledgements

Inspired by [florianeckerstorfer/eleventy-plugin-remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark)
