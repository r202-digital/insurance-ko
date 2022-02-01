import chroma from "chroma-js";
import RichTextEditor from "components/forms/components/RichTextEditor";
import { BreakpointQuery } from "components/shared/breakpoints";
import { StyledFormField } from "components/shared/form/fields";
import { Button, Form } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TermsContext from "./context/terms-context";

const FormContainer = styled.div`
  text-align: initial;
`;

const SubmitButton = styled(Button)`
  font-size: 0.875em;
  line-height: 1.25em;
  width: 100%;

  ${BreakpointQuery("lg")`
    width: auto;
  `}
`;

const Heading = styled.h3`
  ${({ small }) =>
    small
      ? `
    margin-top: 0;
    margin-bottom: 1em;

    padding-bottom: 0.5em;
    border-bottom: 1px solid #F0F0F0;
    font-weight: normal;
    font-size: 1em;
  `
      : ""}
`;

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const KycForm = ({ small }) => {
  const termsContainer = TermsContext.useContainer();
  const { contextTerms } = termsContainer;
  const [terms, setTerms] = useState(
    (Array.isArray(contextTerms) && contextTerms.length && contextTerms) ||
      initialValue
  );

  const onSubmit = (e) => {
    e.preventDefault();
    termsContainer.setContextTerms(terms);
  };

  return (
    <div>
      <Heading small={small}>Product Terms & Conditions</Heading>
      <Form onSubmit={onSubmit}>
        <FormContainer>
          <RichTextEditor
            value={terms}
            setValue={setTerms}
            placeholder="Enter the product terms & conditions here"
          />
          <SubmitButton
            primary
            label="Save"
            type="submit"
            disabled={JSON.stringify(terms) === JSON.stringify(contextTerms)}
          />
        </FormContainer>
      </Form>
    </div>
  );
};

export default KycForm;
