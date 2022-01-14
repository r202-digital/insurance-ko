import React, { useState } from "react";
import { Button, Form, Select, TextArea, TextInput } from "grommet";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import { object, string, number } from "superstruct";
import { breakpoint } from "styled-components-breakpoint";
import { StyledFormField } from "components/shared/form/fields";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import axios from "axios";

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    const { data } = await axios.post("/api/contact-email", e);
    form.reset();
    if (data.success) {
      setSuccess("Message sent!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      setError("Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    // validate, // a record-level validation function to check all form values
  });
  const name = useField("name", form);
  const email = useField("email", form);
  const mobile = useField("mobile", form);
  const helpOption = useField("help", form);
  const specificConcern = useField("specificConcern", form);
  const message = useField("message", form);

  return (
    <Form
      onChange={(value) => {
        if (success || error) {
          setSuccess("");
          setError("");
        }
      }}
      onSubmit={handleSubmit}
    >
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
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

        <StyledFormField label="Mobile Phone" name="mobile">
          <TextInput {...mobile.input} placeholder="0912123123" />
          {mobile.meta.touched && mobile.meta.error && (
            <span>{mobile.meta.error}</span>
          )}
        </StyledFormField>

        <StyledFormField label="How can we help?" name="help">
          <Select
            {...helpOption.input}
            options={[
              "Inquiry",
              "Complaint",
              "Request",
              "Suggestion",
              "Feedback",
              "Notification",
              "Other",
            ]}
          />
          {helpOption.meta.touched && helpOption.meta.error && (
            <span>{helpOption.meta.error}</span>
          )}
        </StyledFormField>

        <StyledFormField label="Any specific concern?" name="specificConcern">
          <Select
            {...specificConcern.input}
            options={[
              "Product Information",
              "Cancellation",
              "Claim",
              "Enrollment",
              "Premium Payment",
              "Change/Update Customer Information",
              "Upgrade/Downgrade",
              "Policy Information",
              "Other",
            ]}
          />
          {specificConcern.meta.touched && specificConcern.meta.error && (
            <span>{specificConcern.meta.error}</span>
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
