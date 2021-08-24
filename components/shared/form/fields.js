import { FormField } from "grommet";
import styled from "styled-components";
import { Colors } from "../colors";

export const StyledFormField = styled(FormField)`
  label {
    color: ${Colors.brand};
    font-weight: bold;
    margin: 0.5em 0;
  }

  input,
  div {
    background-color: ${Colors.lightGray};
    border-radius: 20px;
  }

  input {
    padding-left: 1.5em;
  }
`;
