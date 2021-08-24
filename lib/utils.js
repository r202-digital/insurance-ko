export const extractText = (node) =>
  node.reduce((total, item) => item.text, "");

export const extractLink = (obj) => (obj && obj.url ? obj.url : "");
