import React from "react";
import { Button, Form, TextArea, TextInput } from "grommet";
import styled from "styled-components";
import { StyledFormField } from "components/shared/form/fields";
import { useField, useForm } from "react-final-form-hooks";
import OptionsContext from "./context/options-context";
import { breakpoint } from "styled-components-breakpoint";
import { Close } from "grommet-icons";
import { Breakpoint } from "components/shared/breakpoints";

const FormField = styled(StyledFormField)`
  margin-bottom: 0;
`;

const FormContainer = styled.div`
  text-align: initial;
`;

const ErrorContainer = styled.div`
  text-align: initial;
  margin-bottom: 1em;
`;

const Error = styled.span`
  color: red;
  font-size: 0.75em;
`;

const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const OptionsPill = styled.li`
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border-radius: 20px;
  border: 1px solid #9e9e9e;
  font-size: 0.8125em;
  display: flex;
  align-items: center;

  &:first-of-type {
    margin-left: 0;
  }
`;

const SubmitButton = styled(Button)`
  font-size: 0.875em;
  line-height: 1.25em;
  width: 100%;

  @media (min-width: ${Breakpoint.lg}px) {
    width: auto;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 0.25em;
  padding: 0.25em;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledTextArea = styled(TextArea)`
  font-weight: normal;
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

const OptionsForm = ({ small }) => {
  const optionsContainer = OptionsContext.useContainer();

  const onSubmit = (vals) => {
    const newArray = [...optionsContainer.contextOptions];
    newArray.push(vals);
    optionsContainer.setContextOptions(newArray);
    form.reset();
  };

  const removeItem = (index) => {
    const newArray = [...optionsContainer.contextOptions];
    newArray.splice(index, 1);
    optionsContainer.setContextOptions(newArray);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.price) {
        errors.price = "Required";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      return errors;
    },
  });

  const name = useField("name", form);
  const price = useField("price", form);
  const description = useField("description", form);

  return (
    <div>
      <Heading small={small}>Plan Options</Heading>
      <OptionsList>
        {optionsContainer.contextOptions.map((item, index) => (
          <OptionsPill key={`option-${index}`}>
            {item.name}
            <RemoveButton
              onClick={(e) => {
                e.preventDefault();
                removeItem(index);
              }}
            >
              <Close size="small" />
            </RemoveButton>
          </OptionsPill>
        ))}
      </OptionsList>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <FormField small label="Plan Option Name" name="name">
            <TextInput {...name.input} placeholder="Sample Option" />
          </FormField>
          <ErrorContainer>
            {name.meta.touched && name.meta.error && (
              <Error>{name.meta.error}</Error>
            )}
          </ErrorContainer>
          <FormField small label="Plan Option Price" name="price">
            <TextInput {...price.input} placeholder="123.50" />
          </FormField>
          <ErrorContainer>
            {price.meta.touched && price.meta.error && (
              <Error>{price.meta.error}</Error>
            )}
          </ErrorContainer>
          <FormField small label="Plan Option Description" name="description">
            <StyledTextArea
              {...description.input}
              placeholder="Sample Option Description"
            />
          </FormField>
          <ErrorContainer>
            {description.meta.touched && description.meta.error && (
              <Error>{description.meta.error}</Error>
            )}
          </ErrorContainer>
          <SubmitButton
            primary
            label="Add"
            type="submit"
            disabled={pristine || submitting}
          />
        </FormContainer>
      </Form>
    </div>
  );
};

export default OptionsForm;
