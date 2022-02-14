export const convertToHtml = (json, isList) => {
  return json.map((obj) => {
    switch (obj.type) {
      case "code":
        return (
          <pre {...obj.attributes}>
            <code>{convertToHtml(obj.children)}</code>
          </pre>
        );
      case "paragraph":
        return isList ? (
          <li {...obj.attributes}>{convertToHtml(obj.children)}</li>
        ) : (
          <p {...obj.attributes}>{convertToHtml(obj.children)}</p>
        );
      case "quote":
        return (
          <blockquote {...obj.attributes}>
            {convertToHtml(obj.children)}
          </blockquote>
        );
      case "numbered-list":
        return <ol {...obj.attributes}>{convertToHtml(obj.children, true)}</ol>;
      case "bulleted-list":
        return <ul {...obj.attributes}>{convertToHtml(obj.children, true)}</ul>;
      default:
        let text = obj.text;
        if (obj.bold) {
          text = <strong>{obj.text}</strong>;
        }
        if (obj.italic) {
          text = <em>{text}</em>;
        }
        if (obj.underline) {
          text = <u>{text}</u>;
        }
        return text;
    }
  });
};
