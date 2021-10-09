import { useEffect, useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled, { css } from "styled-components";
import {
  Box,
  Text,
  Grommet,
  FormField,
  TextInput,
  Button,
  Tabs,
  Tab,
} from "grommet";
import axios from "axios";
import Router from "next/router";
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

const signUp = async (value, mutate) => {
  try {
    const signUpUser = await axios.post("/api/signup", value);
    const userData = signUpUser.data && signUpUser.data.user;
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

const SignupForm = () => {
  const [error, setError] = useState("");
  const { mutate } = useSWRConfig();

  async function onSubmit(value) {
    setError("");
    try {
      await signUp(value, mutate);
    } catch (e) {
      setError(e.message);
    }
  }

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate: (values) => {
      const errors = {};
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
      if (!values.email) {
        errors.email = "Required";
      } else {
        const regexCheck = values.email.match(emailRegex);

        if (!regexCheck) {
          errors.email = "Please enter a valid email";
        }
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (!values.name) {
        errors.name = "Required";
      }

      return errors;
    },
  });

  const emailField = useField("email", form);
  const passwordField = useField("password", form);
  const nameField = useField("name", form);

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Name" name="name">
        <TextInput {...nameField.input} />
        {nameField.meta.touched && nameField.meta.error && (
          <StyledError>{nameField.meta.error}</StyledError>
        )}
      </FormField>
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
        label="Sign up"
        type="submit"
        disabled={pristine || submitting}
      />

      {error && <StyledError>{error}</StyledError>}
    </form>
  );
};

export default SignupForm;
