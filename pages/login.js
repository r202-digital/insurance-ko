import { useEffect, useState } from "react";
import Router from "next/router";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
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
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { Colors } from "components/shared/colors";
import LoginForm from "components/forms/login";
import SignupForm from "components/forms/signup";
import { breakpoint } from "styled-components-breakpoint";
import Container from "components/shared/container";
import { BreakpointQuery } from "components/shared/breakpoints";

const customTheme = {
  global: {
    font: {
      size: "16px",
    },
    input: {
      weight: 400,
    },
    colors: Colors,
  },
  tab: {
    active: {
      background: Colors.lightgreen,
      color: "accent-1",
    },
    // background: "dark-3",
    border: undefined,
    color: "white",
    hover: {
      background: "dark-1",
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: "small",
    },
    extend: ({ theme }) => css`
      border-radius: 20px;
      transition: 0.3s;

      &:hover {
        background: ${Colors.brand};
      }
    `,
  },
  formField: {
    label: {
      color: "dark-3",
      size: "small",
      margin: "xsmall",
      weight: 600,
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: true,
      },
    },
    border: undefined,
    content: {
      pad: "small",
    },
    error: {
      background: {
        color: "status-critical",
        opacity: "weak",
      },
    },
    margin: "none",
    extend: ({ theme }) => css`
      input {
        border-radius: 20px;
        background-color: white;
      }
    `,
  },
};

const RichTabTitle = ({ label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

const StyledGrommet = styled(Grommet)`
  margin-top: 1em;
  height: auto !important;
  width: auto !important;
  background-color: transparent;
  ${BreakpointQuery("lg")`
    justify-content: flex-end;
    display: flex;
  `}
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 1em;
  max-width: initial;
  ${BreakpointQuery("lg")`
      max-width: 400px;
      flex: 1;
  `}
`;

const Login = ({ metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
    Router.prefetch("/admin");
    Router.prefetch("/profile");
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <StyledGrommet theme={deepMerge(grommet, customTheme)}>
          <FormContainer>
            <Tabs>
              <Tab title={<RichTabTitle label="Sign in" />}>
                <LoginForm />
              </Tab>
              <Tab title={<RichTabTitle label="Sign up" />}>
                <SignupForm />
              </Tab>
            </Tabs>
          </FormContainer>
        </StyledGrommet>
      </Container>
    </DefaultLayout>
  );
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const metadata =
    (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      metadata,
      preview,
    },
  };
}

export default Login;
