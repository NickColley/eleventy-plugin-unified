import test from "ava";
import internal from "../src/import-plugins.js";
import external from "remark-parse";
import importPlugins from "../src/import-plugins.js";

test("importPlugins › is a function", (assert) => {
  assert.is(typeof importPlugins, "function");
});

test("importPlugins › returns an array with no arguments", async (assert) => {
  assert.deepEqual(await importPlugins(), []);
});

/**
 *  External e.g. ['plugin-name']
 **/
test("importPlugins › external plugin › throws if doesnt exist", async (assert) => {
  const error = await assert.throwsAsync(async () => {
    await importPlugins(["i-dont-exist"]);
  });
  assert.is(error.code, "ERR_MODULE_NOT_FOUND");
});

test("importPlugins › external plugin › does exist", async (assert) => {
  const result = await importPlugins(["remark-parse"]);
  assert.deepEqual(result, [[external, {}]]);
});

test("importPlugins › external plugin › with configuration", async (assert) => {
  const result = await importPlugins([["remark-parse", { property: "value" }]]);
  assert.deepEqual(result, [[external, { property: "value" }]]);
});

/**
 *  Internal e.g. ['./src/plugin-name.js']
 **/
test("importPlugins › internal plugin › throws if doesnt exist", async (assert) => {
  const error = await assert.throwsAsync(async () => {
    await importPlugins(["../i-dont-exist.js"]);
  });
  assert.is(error.code, "ERR_MODULE_NOT_FOUND");
});
test("importPlugins › internal plugin", async (assert) => {
  const result = await importPlugins(["./src/import-plugins.js"]);
  assert.deepEqual(result, [[internal, {}]]);
});

test("importPlugins › internal plugin › with configuration", async (assert) => {
  const result = await importPlugins([
    ["./src/import-plugins.js", { property: "value" }],
  ]);
  assert.deepEqual(result, [[internal, { property: "value" }]]);
});

test("importPlugins › internal plugin › transformsDirectory", async (assert) => {
  const transformsDirectory = "./src/";
  const result = await importPlugins(
    [["import-plugins.js", { property: "value" }]],
    transformsDirectory
  );
  assert.deepEqual(result, [[internal, { property: "value" }]]);
});

/**
 *  Mixed e.g. ['plugin-name', './plugin-name']
 **/

test("importPlugins › mixed", async (assert) => {
  const transformsDirectory = "./src/";
  const result = await importPlugins(
    ["remark-parse", ["import-plugins.js", { property: "value" }]],
    transformsDirectory
  );
  assert.deepEqual(result, [
    [external, {}],
    [internal, { property: "value" }],
  ]);
});
