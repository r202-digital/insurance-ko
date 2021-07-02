export const extractText = (node) =>
  node.reduce((total, item) => item.text, "");
