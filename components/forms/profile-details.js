import ProfileDetailsContext from "components/profile/context/profile-details-context";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { DateField, RoundFormField } from "components/shared/form/fields";
import { Button, TextInput } from "grommet";
import React, { useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import dayjs from "dayjs";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  ${BreakpointQuery("sm")`
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
  `}
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
  font-weight: 400;

  ${BreakpointQuery("lg")`
    width: auto;
    margin-top: 1em;
    padding: 0.5em 2em;
    border-radius: 2em;
  `}
`;

const PhoneField = styled(RoundFormField)`
  & > div {
    border: initial;
    border-radius: 0;
    display: grid;
    grid-template-columns: calc(20% - 0.5rem) calc(80% - 0.5rem);
    grid-column-gap: 1rem;

    & > div {
      border: 1px solid ${Colors.borderGray};
      border-radius: 2rem;

      &:first-of-type {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const SuffixField = styled(RoundFormField)`
  width: 30%;
`;

const GenderField = styled(RoundFormField)`
  & > label {
    margin-top: 0;
  }
  & > div {
    border: initial;
    display: grid;
    grid-template-columns: calc(50% - 0.5rem) calc(50% - 0.5rem);
    grid-column-gap: 1rem;

    button {
      font-weight: 400;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
      border-radius: 2rem;
      border-width: 1px;
      font-size: 1rem;
    }
  }
`;

const ProfileDetailsForm = () => {
  const [error, setError] = useState("");
  const [birthDate, setBirthdate] = useState(null);
  const [gender, setGender] = useState("");
  const profileDetailsContainer = ProfileDetailsContext.useContainer();
  const contextUser = profileDetailsContainer.contextProfileDetails;

  const onSubmit = (val) => {
    const parsedVal = {
      ...val,
      birthDate: dayjs(birthDate).format("DD/MM/YYYY"),
      gender: gender,
    };
    console.log(parsedVal);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    initialValues: {
      firstName: contextUser.firstName,
      lastName: contextUser.lastName,
    },
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
  const suffixField = useField("suffix", form);
  const maritalStatusField = useField("maritalStatus", form);
  const firstAddressField = useField("firstAddress", form);
  const secondAddressField = useField("secondAddress", form);
  const cityField = useField("city", form);
  const provinceField = useField("province", form);
  const postalCodeField = useField("postalCode", form);
  const countryField = useField("country", form);
  const phoneField = useField("phone", form);

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
          <SuffixField label="Suffix" name="suffix">
            <TextInput {...suffixField.input} />
            {suffixField.meta.touched && suffixField.meta.error && (
              <StyledError>{suffixField.meta.error}</StyledError>
            )}
          </SuffixField>
          <GenderField label="Gender" name="gender">
            <Button
              primary={gender === "male"}
              secondary={gender !== "male"}
              label="Male"
              onClick={(e) => {
                e.preventDefault();
                setGender("male");
              }}
            />

            <Button
              primary={gender === "female"}
              secondary={gender !== "female"}
              label="Female"
              onClick={(e) => {
                e.preventDefault();
                setGender("female");
              }}
            />
          </GenderField>
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
          <PhoneField label="Phone Number" name="phone">
            <div>+63</div>
            <TextInput {...phoneField.input} />
            {phoneField.meta.touched && phoneField.meta.error && (
              <StyledError>{phoneField.meta.error}</StyledError>
            )}
          </PhoneField>
        </div>
      </FormGrid>
    </form>
  );
};

export default ProfileDetailsForm;
