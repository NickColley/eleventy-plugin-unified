# Multiple transforms

```bash
npm install eleventy-plugin-unified remark-slug rehype-format unist-util-visit
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  transformsDirectory: "./plugins/",
  markdownTransforms: ["aria-current-links.js", "remark-slug"],
  htmlTransforms: [["rehype-format", { indent: "\t" }]],
});
```

## Add [aria-current="true"] to links plugin

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
