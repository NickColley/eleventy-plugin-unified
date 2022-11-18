# Reporting and linting with retext

The default reporter used is [`vfile-reporter`](https://github.com/vfile/vfile-reporter).

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  textTransforms: ["retext-repeated-words"],
});
```

## Configuring the reporter

```bash
npm install eleventy-plugin-unified retext-repeated-words vfile-reporter
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  reporter: "vfile-reporter-json",
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


## Turning off default reporter

```bash
npm install eleventy-plugin-unified retext-latin
```

```javascript
eleventyConfig.addPlugin(EleventyUnifiedPlugin, {
  reporter: false,
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
