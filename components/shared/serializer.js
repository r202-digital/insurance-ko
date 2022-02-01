export const convertToHtml = (json) => {
  return json.map((obj) => {
    switch (obj.type) {
      case "code":
        return (
          <pre {...obj.attributes}>
            <code>{convertToHtml(obj.children)}</code>
          </pre>
        );
      case "paragraph":
        return <p {...obj.attributes}>{convertToHtml(obj.children)}</p>;
      case "quote":
        return (
          <blockquote {...obj.attributes}>
            {convertToHtml(obj.children)}
          </blockquote>
        );
      case "numbered-list":
        return <ol {...obj.attributes}>{convertToHtml(obj.children)}</ol>;
      case "bulleted-list":
        return <ul {...obj.attributes}>{convertToHtml(obj.children)}</ul>;
      default:
        if (obj.type) {
          return convertToHtml(obj);
        } else {
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
          return <span>{text}</span>;
        }
    }
  });
};
