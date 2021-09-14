import React from "react";
import { Button, Form, TextInput } from "grommet";
import styled from "styled-components";
import { StyledFormField } from "components/shared/form/fields";
import { useField, useForm } from "react-final-form-hooks";
import Select from "react-select";
import chroma from "chroma-js";
import PromoContext from "./context";
import { breakpoint } from "styled-components-breakpoint";
import { Close } from "grommet-icons";

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

const PromoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const PromoPill = styled.li`
  background-color: ${({ color }) =>
    color === "red"
      ? chroma("#FF5630").alpha(0.5).css()
      : chroma("#FFC400").alpha(0.5).css()};
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border-radius: 20px;
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

  ${breakpoint("lg")`
        width: auto;
    `}
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

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      color: isSelected ? data.color : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    ...dot(),
  }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const parseValue = (value) => {
  const { name, color } = value;
  return {
    name: name,
    color: color.value,
  };
};

const PromoForm = () => {
  const promoContainer = PromoContext.useContainer();

  const onSubmit = (vals) => {
    const newArray = [...promoContainer.contextPromo];
    newArray.push(parseValue(vals));
    promoContainer.setContextPromo(newArray);
    form.reset();
  };

  const removeItem = (index) => {
    const newArray = [...promoContainer.contextPromo];
    newArray.splice(index, 1);
    promoContainer.setContextPromo(newArray);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.color) {
        errors.color = "Required";
      }

      return errors;
    },
  });

  const name = useField("name", form);
  const color = useField("color", form);

  return (
    <div>
      <h3>Promos</h3>
      <PromoList>
        {promoContainer.contextPromo.map((item, index) => (
          <PromoPill color={item.color} key={`promo-${index}`}>
            {item.name}
            <RemoveButton
              onClick={(e) => {
                e.preventDefault();
                removeItem(index);
              }}
            >
              <Close size="small" />
            </RemoveButton>
          </PromoPill>
        ))}
      </PromoList>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <FormField small label="Promo Name" name="name">
            <TextInput {...name.input} placeholder="Sample Promo" />
          </FormField>
          <ErrorContainer>
            {name.meta.touched && name.meta.error && (
              <Error>{name.meta.error}</Error>
            )}
          </ErrorContainer>
          <FormField small label="Promo Tag Color" name="color">
            <Select
              defaultValue="yellow"
              options={[
                { value: "yellow", label: "Yellow", color: "#FFC400" },
                { value: "red", label: "Red", color: "#FF5630" },
              ]}
              styles={colourStyles}
              {...color.input}
            />
          </FormField>
          <ErrorContainer>
            {color.meta.touched && color.meta.error && (
              <Error>{color.meta.error}</Error>
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

export default PromoForm;
