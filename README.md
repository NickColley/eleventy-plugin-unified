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
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    "remark-slug", // Add [id] attributes to headings.
  ]);
};
```

### Full example

```bash
npm install eleventy-plugin-unified remark-slug rehype-format unist-util-visit
```

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
    transformsDirectory: "./plugins/",
    markdownTransforms: ["aria-current-links.js", "remark-slug"],
    htmlTransforms: [["rehype-format", { indent: "\t" }]],
  });
};
```

```javascript
// ./plugins/aria-current-links.js
import { join } from "node:path";
import { visit } from "unist-util-visit";

// If the link matches the current page set 'aria-current' to true
export default function ariaCurrentLinks() {
  const {
    pageContext: { page },
  } = this.data();
  return (tree) => {
    visit(tree, ["link", "linkReference"], (node) => {
      const url = node?.url;
      if (url && join(page.filePathStem) !== join(url)) {
        return;
      }
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data.hProperties,
          "aria-current": "true",
        },
      };
    });
  };
}
```

### Configuring markdown transforms (remark plugins)

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    markdownTransforms: [
        'remark-emoji'
    ]
  ]);
};
```

### Configuring html transforms (rehype plugins)

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    htmlTransforms: [
        'rehype-format'
    ]
  ]);
};
```

### Configuring text transforms (retext plugins)

```bash
npm install eleventy-plugin-unified retext-repeated-words vfile-reporter
```

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    reporter: 'vfile-reporter',
    textTransforms: [
        'retext-repeated-words'
    ]
  ]);
};
```

or

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    reporter: (file) => {
      console.log(file);
    },
    textTransforms: [
        'retext-repeated-words'
    ]
  ]);
};
```

### Configuring text parser language

```bash
npm install eleventy-plugin-unified retext-latin retext-repeated-words vfile-reporter
```

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    textParser: 'retext-latin',
    reporter: 'vfile-reporter',
    textTransforms: [
        'retext-repeated-words'
    ]
  ]);
};
```

### Configuring options for a plugin

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    htmlTransforms: [
        ["rehype-format", { indent: "\t" }]
    ],
  ]);
};
```

### Configuring internal plugins

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    markdownTransforms: [
        "./plugins/responsive-tables.js"
    ],
  ]);
};
```

or

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
    transformsDirectory: "./plugins",
    markdownTransforms: [
        "responsive-tables.js"
    ],
  ]);
};
```

### Getting access to page context and eleventy config

```bash
npm install eleventy-plugin-unified unist-util-visit
```

```javascript
// .eleventy.config.cjs
const EleventyUnifiedPlugin = require("eleventy-plugin-unified");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
    transformsDirectory: "./plugins/",
    markdownTransforms: ["log-data.js"],
  });
};
```

```javascript
// ./plugins/log-data.js

export default function logData() {
  const { pageContext, eleventyConfig } = this.data();
  console.log({ pageContext, eleventyConfig });
}
```

## Acknowledgements

Inspired by [florianeckerstorfer/eleventy-plugin-remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark)
