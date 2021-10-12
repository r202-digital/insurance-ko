import React, { useEffect, useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import { FormField, TextInput, Button } from "grommet";
import Router from "next/router";
import axios from "axios";
import { useSWRConfig } from "swr";

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

const Form = styled.form`
  padding-top: 0.5em;
`;

const signIn = async (email, password, mutate) => {
  try {
    const loginUser = await axios.post("/api/login", {
      username: email,
      password,
    });

    const userData = loginUser.data && loginUser.data.user;
    if (userData) {
      mutate("/api/profile", () => ({
        hasUser: true,
        user: userData,
        done: true,
      }));
    }
    if (userData.role && userData.role === "admin") {
      Router.push("/admin");
    } else {
      Router.push("/profile");
    }
  } catch (e) {
    throw new Error(e.response.data);
  }
};

const LoginForm = ({ metadata }) => {
  const [error, setError] = useState("");
  const { mutate } = useSWRConfig();

  async function onSubmit(value) {
    setError("");
    const { email, password } = value;

    try {
      await signIn(email, password, mutate);
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
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
};

export default LoginForm;
