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
| reporter            | [vfile reporter]               | [vfile-reporter] |

[remark plugins]: https://unifiedjs.com/explore/keyword/remark
[rehype plugins]: https://unifiedjs.com/explore/keyword/rehype
[retext plugins]: https://unifiedjs.com/explore/keyword/retext
[retext-english]: https://www.npmjs.com/package/retext-english
[vfile-reporter]: https://github.com/vfile/vfile-reporter
[vfile reporter]: https://github.com/vfile/vfile#reporters

---

## Documentation

### [Configure options for transforms](#configure-options-for-transforms-1)

### [Adding your own transforms](#adding-your-own-transforms-1)

### [Using page context and eleventy data](./docs/eleventy.md)

- [Logging the available data](./docs/eleventy.md#logging-the-available-data)
- [Re-using eleventy filters](./docs/eleventy.md#re-using-eleventy-filters)

### [Transforming markdown with remark](./docs/markdown.md)

- [Wrapping a table with a responsive container](./docs/markdown.md#wrapping-a-table-with-a-responsive-container)
- [Style links that match the current page](./docs/markdown.md#style-links-that-match-the-current-page)

### [Transforming html with rehype](./docs/html.md)

### [Reporting and linting with retext](./docs/text.md)

- [Configuring the reporter](./docs/text.md#configuring-the-reporter)
- [Turning off default reporter](./docs/text.md#turning-off-default-reporter)
- [Configuring text parser language](./docs/text.md#configuring-text-parser-language)

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

---

## With thanks to

- [Titus for the Unified ecosystem](https://twitter.com/wooorm)
- [florianeckerstorfer/eleventy-plugin-remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark)
