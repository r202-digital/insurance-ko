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
import ProductModal from "./ProductModal";
import PromoContext from "./context/promo-context";
import OptionsContext from "./context/options-context";
import ProductsContext from "./context/product-context";
import { breakpoint } from "styled-components-breakpoint";
import { Button } from "grommet";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import DeleteModal from "./DeleteModal";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";

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
  grid-template-columns: 40px 1fr 90px;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
`;

const ProductContent = styled.div`
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: center;
  `}
`;

const ProductLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const AdminList = ({ isLoading }) => {
  const classes = useAdminListStyles();
  const productsContainer = ProductsContext.useContainer();

  useEffect(() => {
    async function fetchProducts() {
      let {
        data: { products },
      } = await axios.get("/api/get-product");
      productsContainer.setContextProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <MainCard content={false}>
        <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignContent="center"
                justifyContent="space-between"
              >
                <Grid display="flex" alignItems="center" item>
                  <Typography variant="h4">Products</Typography>
                </Grid>
                <Grid item>
                  <OptionsContext.Provider>
                    <PromoContext.Provider>
                      <ProductModal />
                    </PromoContext.Provider>
                  </OptionsContext.Provider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ProductList>
                {productsContainer.contextProducts.map((product, index) => {
                  // console.log(product);
                  return (
                    <ProductListItem key={`product-${index}`}>
                      <input type="checkbox" />
                      <ProductContent>
                        <div>
                          <Typography>
                            <strong>{product.name}</strong>
                          </Typography>
                          <Typography>
                            {product.planOptions?.length || ""} Plan Option
                            {product.planOptions?.length &&
                              product.planOptions?.length > 1 &&
                              "s"}
                          </Typography>
                        </div>
                        <Typography>
                          <strong>Code:</strong> {product.uid}
                        </Typography>
                        <Typography>
                          <strong>Type:</strong>{" "}
                          {product.type && product.type.value}
                        </Typography>
                      </ProductContent>
                      <DeleteModal product={product} index={index} />
                    </ProductListItem>
                  );
                })}
              </ProductList>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </React.Fragment>
  );
};

AdminList.propTypes = {
  isLoading: PropTypes.bool,
};

export default AdminList;
