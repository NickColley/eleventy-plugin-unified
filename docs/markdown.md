# Transforming markdown with remark

```bash
npm install eleventy-plugin-unified remark-emoji
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  markdownTransforms: ["remark-emoji"],
});
```
