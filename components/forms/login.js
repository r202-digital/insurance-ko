import React, { useEffect, useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import { FormField, TextInput, Button } from "grommet";
import Router from "next/router";
import axios from "axios";

const StyledError = styled.span`
  font-size: 0.75em;
  color: red;
  padding: 0 0.5em;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin: 2em 0;
  margin-bottom: 1em;
`;

const signIn = async (email, password) => {
  try {
    await axios.post("/api/login", {
      email,
      password,
    });
  } catch (e) {
    throw new Error(e.response.data);
  }

  Router.push("/profile");
};

const LoginForm = ({ metadata }) => {
  const [error, setError] = useState("");
  async function onSubmit(value) {
    setError("");
    const { email, password } = value;

    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    Router.prefetch("/profile");
  }, []);

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  const emailField = useField("email", form);
  const passwordField = useField("password", form);

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email" name="email">
        <TextInput {...emailField.input} />
        {emailField.meta.touched && emailField.meta.error && (
          <StyledError>{emailField.meta.error}</StyledError>
        )}
      </FormField>
      <FormField label="Password" name="password">
        <TextInput {...passwordField.input} type="password" />
        {passwordField.meta.touched && passwordField.meta.error && (
          <StyledError>{passwordField.meta.error}</StyledError>
        )}
      </FormField>

      <SubmitButton
        primary
        label="Sign in"
        type="submit"
        disabled={pristine || submitting}
      />

      {error && <StyledError>{error}</StyledError>}
    </form>
  );
};

export default LoginForm;
