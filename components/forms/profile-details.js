import { Breakpoint } from "components/shared/breakpoints";
import { DateField, RoundFormField } from "components/shared/form/fields";
import { Button, TextInput } from "grommet";
import React, { useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  @media (min-width: ${Breakpoint.sm}px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
  }
`;

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: 30% calc(70% - 1rem);
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
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

const ProfileDetailsForm = () => {
  const [error, setError] = useState("");
  const [birthDate, setBirthdate] = useState(null);

  const onSubmit = (val) => {
    console.log(val);
    console.log(birthDate);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "Required";
      }

      return errors;
    },
  });

  const firstNameField = useField("firstName", form);
  const lastNameField = useField("lastName", form);
  const middleNameField = useField("middleName", form);
  const maritalStatusField = useField("maritalStatus", form);
  const firstAddressField = useField("firstAddress", form);
  const secondAddressField = useField("secondAddress", form);
  const cityField = useField("city", form);
  const provinceField = useField("province", form);
  const postalCodeField = useField("postalCode", form);
  const countryField = useField("country", form);

  return (
    <form onSubmit={handleSubmit}>
      {error && <StyledError>{error}</StyledError>}
      <FormGrid>
        <div>
          <RoundFormField label="First Name" name="firstName">
            <TextInput {...firstNameField.input} />
            {firstNameField.meta.touched && firstNameField.meta.error && (
              <StyledError>{firstNameField.meta.error}</StyledError>
            )}
          </RoundFormField>
          <RoundFormField label="Last Name" name="lastName">
            <TextInput {...lastNameField.input} />
            {lastNameField.meta.touched && lastNameField.meta.error && (
              <StyledError>{lastNameField.meta.error}</StyledError>
            )}
          </RoundFormField>
          <DateField
            id="birth-date"
            label="Date of birth"
            setValue={setBirthdate}
            value={birthDate}
          />
          <RoundFormField label="Marital Status" name="maritalStatus">
            <TextInput {...maritalStatusField.input} />
            {maritalStatusField.meta.touched &&
              maritalStatusField.meta.error && (
                <StyledError>{maritalStatusField.meta.error}</StyledError>
              )}
          </RoundFormField>
        </div>
        <div>
          <RoundFormField label="Middle Name" name="middleName">
            <TextInput {...middleNameField.input} />
            {middleNameField.meta.touched && middleNameField.meta.error && (
              <StyledError>{middleNameField.meta.error}</StyledError>
            )}
          </RoundFormField>
        </div>
        <div>
          <RoundFormField label="Address 1" name="firstAddress">
            <TextInput {...firstAddressField.input} />
            {firstAddressField.meta.touched && firstAddressField.meta.error && (
              <StyledError>{firstAddressField.meta.error}</StyledError>
            )}
          </RoundFormField>
          <RoundFormField label="City" name="city">
            <TextInput {...cityField.input} />
            {cityField.meta.touched && cityField.meta.error && (
              <StyledError>{cityField.meta.error}</StyledError>
            )}
          </RoundFormField>
          <CountryGrid>
            <RoundFormField label="Postal Code" name="postalCode">
              <TextInput {...postalCodeField.input} />
              {postalCodeField.meta.touched && postalCodeField.meta.error && (
                <StyledError>{postalCodeField.meta.error}</StyledError>
              )}
            </RoundFormField>
            <RoundFormField label="Country" name="country">
              <TextInput {...countryField.input} />
              {countryField.meta.touched && countryField.meta.error && (
                <StyledError>{countryField.meta.error}</StyledError>
              )}
            </RoundFormField>
          </CountryGrid>
          <SubmitButton
            primary
            label="Save Changes"
            type="submit"
            disabled={pristine || submitting}
          />
        </div>
        <div>
          <RoundFormField label="Address 2" name="secondAddress">
            <TextInput {...secondAddressField.input} />
            {secondAddressField.meta.touched &&
              secondAddressField.meta.error && (
                <StyledError>{secondAddressField.meta.error}</StyledError>
              )}
          </RoundFormField>
          <RoundFormField label="Province" name="province">
            <TextInput {...provinceField.input} />
            {provinceField.meta.touched && provinceField.meta.error && (
              <StyledError>{provinceField.meta.error}</StyledError>
            )}
          </RoundFormField>
        </div>
      </FormGrid>
    </form>
  );
};

export default ProfileDetailsForm;
