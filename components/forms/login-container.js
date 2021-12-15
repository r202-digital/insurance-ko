import LoginForm from "components/forms/login";
import SignupForm from "components/forms/signup";
import { Colors } from "components/shared/colors";
import { SectionHeading } from "components/shared/section";
import { Box, Grommet, Tab, Tabs, Text } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { styled, css } from "stitches.config";

const customTheme = {
  global: {
    font: {
      family: "Open Sans",
      size: "16px",
    },
    input: {
      weight: 400,
    },
    colors: Colors,
  },
  tabs: {
    header: {
      extend: () => `
        justify-content: flex-start;
        border-radius: 20px;
        padding: 2px;
        border: 1px solid ${Colors.borderGray};
        color: ${Colors.titleGray};
      `,
    },
  },
  tab: {
    active: {
      background: Colors.lightgreen,
      color: "accent-1",
    },
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
    extend: () => `
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
    extend: () => `
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

const DarkHeading = styled(SectionHeading, {
  color: Colors.brandDark,
  fontSize: "1.75em",
  marginTop: "1.5em",
});

const StyledGrommet = styled(Grommet, {
  height: "auto !important",
  width: "auto !important",
  backgroundColor: Colors.brandDark,
  display: "flex",
});

const FormContainer = styled("div", {
  borderRadius: "20px",
  backgroundColor: "white",
  padding: "3em",
  "& > div": {
    alignItems: "flex-start",
  },
  "@lg": {
    margin: "2.5em 4em",
    flex: "1",
  },
});
const LoginContainer = () => {
  return (
    <StyledGrommet theme={deepMerge(grommet, customTheme)}>
      <FormContainer>
        <Tabs>
          <Tab title={<RichTabTitle label="Sign in" />}>
            <DarkHeading as="h2">Lorem Ipsum Dolor!</DarkHeading>
            <Text size="small">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod.
            </Text>
            <LoginForm />
          </Tab>
          <Tab title={<RichTabTitle label="Sign up" />}>
            <SignupForm />
          </Tab>
        </Tabs>
      </FormContainer>
    </StyledGrommet>
  );
};

export default LoginContainer;
