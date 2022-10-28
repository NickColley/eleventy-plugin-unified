# Transforming markdown with remark

```bash
npm install eleventy-plugin-unified remark-emoji
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  markdownTransforms: ["remark-emoji"],
});
```

## Wrapping a table with a responsive container

```bash
npm install eleventy-plugin-unified deep-merge unist-util-visit
```

```javascript
import { visit, SKIP } from "unist-util-visit";
import merge from "deepmerge";

// <table>...</table> => <div class="table-responsive"><table>...</div></div>
export default function responsiveTables() {
  return (tree) => {
    visit(tree, ["table"], (node, index) => {
      node.children = [{ ...node }];
      node.type = "parent";
      node.data = merge(node.data, {
        hProperties: {
          className: "table-responsive",
        },
      });
      return [SKIP, index + 1];
    });
  };
}
```

```css
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
```

## Style links that match the current page

```bash
npm install eleventy-plugin-unified unist-util-visit deepmerge
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, [
  "./plugins/aria-current-links.js",
]);
```

```javascript
// ./plugins/aria-current-links.js
import { join } from "node:path";
import { visit } from "unist-util-visit";

// If the link matches the current page set 'aria-current' to true
// <a>...</a> => <a aria-current="true>...</a>
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
      node.data = merge(node.data, {
        hProperties: {
          "aria-current": "true",
        },
      });
    });
  };
}
```

```css
/**
* When an link targetting the current page:
* - use the body text colour
* - show underline on interaction
**/
[aria-current="true"] {
  color: currentColor;
}
[aria-current="true"]:not(:focus):not(:active):not(:hover) {
  text-decoration: none;
}
```
