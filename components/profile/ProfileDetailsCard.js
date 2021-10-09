import { CardContent, Typography, Divider } from "@material-ui/core";
// project imports
import MainCard from "components/cards/MainCard";
import { Flex } from "components/shared/container";
import { Grommet, grommet, Tab, Tabs, Box, Grid } from "grommet";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { deepMerge } from "grommet/utils";
import { Colors } from "components/shared/colors";
import { gridSpacing } from "lib/constant";
import theme from "lib/theme";
import { Breakpoint } from "components/shared/breakpoints";
import ProfileDetailsForm from "components/forms/profile-details";

const tabTheme = deepMerge(grommet, {
  global: {
    font: {
      family: "'Open Sans', sans-serif",
      size: "16px",
    },
    input: {
      weight: 400,
    },
    colors: Colors,
  },
  tabs: {
    header: {
      border: undefined,
    },
    extend: ({ theme }) => css`
      & > div:first-of-type {
        width: 100%;
        border-bottom: 1px solid ${Colors.borderGray};
      }

      button:first-of-type {
        & > div {
          padding-left: 0;
        }
      }

      button {
        span {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.235;
        }
      }
    `,
  },
  tab: {
    color: "black",
    active: {
      color: Colors.yellowGreen,
    },
    border: {
      side: "bottom",
      size: "1px",
      color: Colors.borderGray,
      active: {
        color: Colors.yellowGreen,
      },
      hover: {
        color: Colors.yellowGreen,
      },
    },
    pad: {
      top: "0",
      bottom: "1em",
      left: "1em",
      right: "1em",
    },
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: "-1px",
      horizontal: "none",
    },
  },
});

const StyledGrommet = styled(Grommet)`
  height: auto !important;
  width: auto !important;
  background-color: transparent;
`;

const ProfileDetailsCard = ({ isLoading }) => {
  return (
    <React.Fragment>
      <MainCard content={false}>
        <CardContent>
          <StyledGrommet theme={tabTheme}>
            <Tabs justify="start" alignControls="start">
              <Tab title="Profile">
                <ProfileDetailsForm />
              </Tab>
              <Tab title="Dependents">
                <Box fill pad="large" align="center">
                  Sample 2
                </Box>
              </Tab>
            </Tabs>
          </StyledGrommet>
        </CardContent>
      </MainCard>
    </React.Fragment>
  );
};

ProfileDetailsCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default ProfileDetailsCard;
