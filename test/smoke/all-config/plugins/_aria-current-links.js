import { join } from "node:path";
import { visit } from "unist-util-visit";
import merge from "deepmerge";

export default function ariaCurrentLinks() {
  const {
    pageContext: { page },
  } = this.data();
  return (tree) => {
    visit(tree, ["link", "linkReference", "wikiLink"], (node) => {
      const url = node?.url || node?.data?.hProperties?.href;
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
