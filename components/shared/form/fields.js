import { FormField } from "grommet";
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
