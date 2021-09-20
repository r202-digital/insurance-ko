import React, { useEffect, useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import { FormField, TextInput, Button } from "grommet";
import Router from "next/router";
import axios from "axios";

const StyledFormField = styled(FormField)`
  font-size: 0.875em;

  label {
    font-size: 1em;
  }

  & > div:last-of-type {
    border-color: transparent;
  }
`;

const StyledTextInput = styled(TextInput)`
  background-color: white;
  font-weight: normal;
`;

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

const updateProduct = async (email, password) => {
  // try {
  //   await axios.post("/api/login", {
  //     username: email,
  //     password,
  //   });
  // } catch (e) {
  //   throw new Error(e.response.data);
  // }
  // Router.push("/profile");
};

const ProductForm = ({ product }) => {
  const [error, setError] = useState("");
  async function onSubmit(value) {
    setError("");
    console.log(value);
    // const { email, password } = value;

    // try {
    //   await updateProduct(email, password);
    // } catch (e) {
    //   setError(e.message);
    // }
  }

  useEffect(() => {
    Router.prefetch("/profile");
  }, []);

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.price) {
        errors.price = "Required";
      }

      if (!values.tag) {
        errors.tag = "Required";
      }

      return errors;
    },
    initialValues: {
      name: product.name,
      price: product.price,
      tag: product.tag,
    },
  });

  const nameField = useField("name", form);
  const priceField = useField("price", form);
  const tagField = useField("tag", form);

  return (
    <form onSubmit={handleSubmit}>
      <StyledFormField label="Product Name" name="name">
        <StyledTextInput {...nameField.input} />
        {nameField.meta.touched && nameField.meta.error && (
          <StyledError>{nameField.meta.error}</StyledError>
        )}
      </StyledFormField>
      <StyledFormField label="Price" name="price">
        <StyledTextInput {...priceField.input} />
        {priceField.meta.touched && priceField.meta.error && (
          <StyledError>{priceField.meta.error}</StyledError>
        )}
      </StyledFormField>
      <StyledFormField label="Product Tag" name="tag">
        <StyledTextInput {...tagField.input} />
        {tagField.meta.touched && tagField.meta.error && (
          <StyledError>{tagField.meta.error}</StyledError>
        )}
      </StyledFormField>

      <SubmitButton
        primary
        label="Save"
        type="submit"
        disabled={pristine || submitting}
      />

      {error && <StyledError>{error}</StyledError>}
    </form>
  );
};

export default ProductForm;
