import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const Button = styled.span(
  ({ active, reversed }) => `
        cursor: pointer;
        color: ${
          reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"
        };
`
);

const EditorContainer = styled.div`
  margin: 30px -20px 0;
`;

const TextSample = styled.div`
  font-size: 14px;
  padding: 5px 20px;
  color: #404040;
  border-top: 2px solid #eeeeee;
  background: #f8f8f8;
`;

const TextLines = styled.div`
  color: #404040;
  font: 12px monospace;
  white-space: pre-wrap;
  padding: 10px 20px;
  div {
    margin: 0 0 0.5em;
  }
`;

export const EditorValue = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join("\n");
    return (
      <EditorContainer ref={ref} {...props}>
        <TextSample>Slate's value as text</TextSample>
        <TextLines>{textLines}</TextLines>
      </EditorContainer>
    );
  }
);

export const Instruction = styled.div`
  white-space: pre-wrap;
  margin: 0 -20px 10px;
  padding: 10px 20px;
  font-size: 14px;
  background: #f8f8e8;
`;

export const Menu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;
