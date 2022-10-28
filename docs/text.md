# Reporting and linting with retext

```bash
npm install eleventy-plugin-unified retext-repeated-words vfile-reporter
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  reporter: "vfile-reporter",
  textTransforms: ["retext-repeated-words"],
});
```

or

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  reporter: (file) => {
    console.log(file);
  },
  textTransforms: ["retext-repeated-words"],
});
```

## Configuring text parser language

```bash
npm install eleventy-plugin-unified retext-latin
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  textParser: "retext-latin",
});
```
