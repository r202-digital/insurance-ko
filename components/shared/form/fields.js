import { Typography } from "@material-ui/core";
import { FormField } from "grommet";
import { useState } from "react";
import { SingleDatePicker } from "react-dates";
import styled from "styled-components";
import { Colors } from "../colors";

export const StyledFormField = styled(FormField)`
  label {
    color: ${Colors.brand};
    font-weight: bold;
    margin: 0.5em 0;
    font-size: ${({ small }) => (small ? "0.875em" : "1.125em")};
  }

  input,
  div {
    background-color: ${Colors.lightGray};
    border-radius: 20px;
    font-weight: ${({ small }) => (small ? "normal" : "bold")};
  }

  input {
    padding-left: 1.5em;
  }
`;

export const RoundFormField = styled(FormField)`
  label {
    font-size: 0.875rem;
    margin: 0;
    margin-top: 0.5em;
    color: ${Colors.brand};
  }

  & > div {
    border-radius: 2rem;
    border: 1px solid ${Colors.borderGray};
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      padding-right: 1em;
    }
  }

  input {
    padding-left: 1em;
  }
`;

const DateFieldLabel = styled(Typography)`
  color: ${Colors.brand};
  line-height: 24px;
  margin-top: 0.5em;
`;

const DateFieldContainer = styled.div`
  & > div:last-of-type {
    width: 100%;
    & > div {
      width: 100%;
      & > div {
        width: 100%;

        border-radius: 1rem;
        border: 1px solid ${Colors.borderGray};

        & > div:first-of-type {
          border-radius: 1rem;
          width: 100%;

          input {
            border-radius: 1rem;
            &.DateInput_input__focused {
              border-bottom: initial;
            }
          }
        }
      }
    }
  }
`;

export const DateField = ({ id, label, value, setValue, ...props }) => {
  const [date, setDate] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <DateFieldContainer>
      <DateFieldLabel>{label || "Date Field"}</DateFieldLabel>
      <SingleDatePicker
        date={value ? value : date}
        onDateChange={(date) => (!!setValue ? setValue(date) : setDate(date))}
        focused={focused}
        onFocusChange={({ focused }) => setFocused(focused)}
        id={id || "date-picker"}
        placeholder=""
      />
    </DateFieldContainer>
  );
};
