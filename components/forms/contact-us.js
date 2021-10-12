import React, { useState } from "react";
import { Button, Form, Select, TextArea, TextInput } from "grommet";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import { object, string, number } from "superstruct";
import { breakpoint } from "styled-components-breakpoint";
import { StyledFormField } from "components/shared/form/fields";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";

const FormData = object({
  name: string(),
});

const FormContainer = styled.div`
  text-align: initial;
`;

const SubmitButton = styled(Button)`
  width: 100%;

  ${BreakpointQuery("lg")`
    width: auto;
  `}
`;

const ContactUsForm = () => {
  const onSubmit = (e) => {
    console.log("Sample: ", e);
  };
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    // validate, // a record-level validation function to check all form values
  });
  const name = useField("name", form);
  const email = useField("email", form);
  const helpOption = useField("help", form);
  const message = useField("message", form);

  return (
    <Form
      onChange={(value) => console.log("Change", value)}
      onSubmit={handleSubmit}
    >
      <FormContainer>
        <StyledFormField label="Name" name="name">
          <TextInput {...name.input} placeholder="John Doe" />
          {name.meta.touched && name.meta.error && (
            <span>{name.meta.error}</span>
          )}
        </StyledFormField>
        <StyledFormField label="Email" name="email">
          <TextInput {...email.input} placeholder="example@mail.com" />
          {email.meta.touched && email.meta.error && (
            <span>{email.meta.error}</span>
          )}
        </StyledFormField>

        <StyledFormField label="How can we help?" name="help">
          <Select
            {...helpOption.input}
            options={["small", "medium", "large"]}
          />
          {helpOption.meta.touched && helpOption.meta.error && (
            <span>{helpOption.meta.error}</span>
          )}
        </StyledFormField>

        <StyledFormField label="Message" name="message">
          <TextArea {...message.input} placeholder="Type something" />
          {message.meta.touched && message.meta.error && (
            <span>{message.meta.error}</span>
          )}
        </StyledFormField>

        <SubmitButton
          primary
          label="Send"
          type="submit"
          disabled={pristine || submitting}
        />
      </FormContainer>
    </Form>
  );
};

export default ContactUsForm;
