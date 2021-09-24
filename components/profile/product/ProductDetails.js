import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// material-ui
import { makeStyles } from "@material-ui/styles";
import {
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// project imports
import MainCard from "components/cards/MainCard";
import { gridSpacing } from "lib/constant";
import styled from "styled-components";
import axios from "axios";
import { breakpoint } from "styled-components-breakpoint";
import { Button } from "grommet";
import { FaTrash } from "react-icons/fa";
import ProfileLayout from "../ProfileLayout";

// assets
// import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
// import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
// import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";

// style constant
export const useAdminListStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardAction: {
    padding: "10px",
    paddingTop: 0,
    justifyContent: "center",
  },
  divider: {
    marginTop: "12px",
    marginBottom: "12px",
  },
  avatarSuccess: {
    width: "16px",
    height: "16px",
    borderRadius: "5px",
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
    marginLeft: "15px",
  },
  successDark: {
    color: theme.palette.success.dark,
  },
  avatarError: {
    width: "16px",
    height: "16px",
    borderRadius: "5px",
    backgroundColor: theme.palette.orange.light,
    color: theme.palette.orange.dark,
    marginLeft: "15px",
  },
  errorDark: {
    color: theme.palette.orange.dark,
  },
}));

const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ProductListItem = styled.li`
  border-bottom: 1px solid #efefef;
  padding: 1em 0;

  &:first-of-type {
    border-top: 1px solid #efefef;
  }

  display: grid;
  grid-template-columns: 40px 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
`;

const ProductContent = styled.div`
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: center;
  `}
`;

const ProductDetails = ({ data }) => {
  const { name } = data;
  return (
    <ProfileLayout>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignContent="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h4">{name}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    Sample
                  </Grid>
                </Grid>
              </CardContent>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignContent="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h4">Products</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    Sample
                  </Grid>
                </Grid>
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </ProfileLayout>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
};

export default ProductDetails;
