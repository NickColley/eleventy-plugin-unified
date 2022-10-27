import { join, parse } from "node:path";

export default async function importPlugins(
  plugins = [],
  transformsDirectory = "."
) {
  return await Promise.all(
    plugins.map(async (plugin) => {
      let options = {};
      let name = plugin;
      // ["plugin-name", { options }]
      if (typeof plugin === "object") {
        [name, options] = plugin;
      }
      const { ext } = parse(name);
      const isInternalPlugin = !!ext;
      const importPath = isInternalPlugin
        ? join(process.cwd(), transformsDirectory, name)
        : name;
      const { default: pluginFunction } = await import(importPath);
      return [pluginFunction, options];
    })
  );
}
