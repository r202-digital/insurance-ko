export const extractText = (node) =>
  node && Array.isArray(node)
    ? node.reduce((total, item) => (item && item.text ? item.text : ""), "")
    : "";

export const extractLink = (obj) => (obj && obj.url ? obj.url : "");
