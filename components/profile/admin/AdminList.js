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
import PromoContext from "./context";
import OptionsContext from "./options-context";

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

const StyledAccordion = styled(Accordion)`
  background-color: #f7f7f7;

  &:first-of-type,
  &:last-of-type {
    border-radius: 0;
  }
`;

//-----------------------|| DASHBOARD DEFAULT - POPULAR CARD ||-----------------------//

const AdminList = ({ isLoading }) => {
  const classes = useAdminListStyles();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      let {
        data: { products },
      } = await axios.get("/api/get-product");
      setProductData(products);
    }
    fetchProducts();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  };

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
                <Grid item>
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
              {productData.map((product, index) => (
                <StyledAccordion key={`accordionItem-${index}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {product.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
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
