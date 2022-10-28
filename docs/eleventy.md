# Using page context and eleventy data

| Data             | Description                             |
| ---------------- | --------------------------------------- |
| `pageContext`    | current page context data e.g. fileSlug |
| `eleventyConfig` | global eleventy configuration           |

## Logging the available data

```javascript
// .eleventy.js
eleventyConfig.addPlugin(EleventyUnifiedPlugin, ["log-data.js"]);
```

```javascript
// log-data.js
export default function logData() {
  const { pageContext, eleventyConfig } = this.data();
  console.log({ pageContext, eleventyConfig });
}
```

## Re-using eleventy filters

You can access the [filters](https://www.11ty.dev/docs/filters/) normally available in a page.

```javascript
// .eleventy.js
eleventyConfig.addPlugin(EleventyUnifiedPlugin, ["log-data.js"]);
```

```javascript
// log-data.js
export default function logData() {
  const { eleventyConfig } = this.data();
  const { slugify } = eleventyConfig.javascriptFunctions;
  console.log(slugify("My Title"));
  // Outputs: "/my-title/"
}
```
