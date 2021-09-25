import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// material-ui
import { CardContent, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "components/cards/MainCard";
import { gridSpacing } from "lib/constant";
import styled from "styled-components";
import axios from "axios";
import { breakpoint } from "styled-components-breakpoint";
import ProfileLayout from "../ProfileLayout";
import PromoForm from "../admin/PromoForm";
import OptionsForm from "../admin/OptionsForm";
import CreateSelect from "components/shared/form/creatable-select";
import { Button, Form, TextInput } from "grommet";
import { StyledFormField } from "components/shared/form/fields";
import { useField, useForm } from "react-final-form-hooks";
import ProductDetailContext from "./product-detail-context";
import { Colors } from "components/shared/colors";
import PromoContext from "../admin/promo-context";
import OptionsContext from "../admin/options-context";

const FormContainer = styled.div`
  text-align: initial;
`;

const FormField = styled(StyledFormField)`
  margin-bottom: 0;
`;

const SubmitButton = styled(Button)`
  padding: 0.75em 2.5em;
  border-radius: 2em;
  background-color: ${Colors.yellowGreen};
`;

const ErrorContainer = styled.div`
  text-align: initial;
  margin-bottom: 1em;
`;

const Error = styled.span`
  color: red;
  font-size: 0.75em;
`;

const ProductHeading = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 0.5em;
  padding-right: 0.5em;

  &:last-child {
    padding-bottom: 0.5em;
  }
`;

const ProductName = styled(Typography)`
  span {
    color: ${Colors.yellowGreen};
  }
`;

const ProductDetails = () => {
  const productDetailContainer = ProductDetailContext.useContainer();
  const promoContainer = PromoContext.useContainer();
  const optionContainer = OptionsContext.useContainer();
  const { contextProductDetail, setContextProductDetail } =
    productDetailContainer;
  const { contextPromo } = promoContainer;
  const { contextOptions } = optionContainer;
  const onSubmit = async (val) => {
    const obj = {
      ...contextProductDetail,
      ...val,
      promos: contextPromo,
      planOptions: contextOptions,
    };
    setContextProductDetail(obj);

    const updateProd = await axios.post("/api/update-product", obj);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    initialValues: {
      name: contextProductDetail.name,
      price: contextProductDetail.price,
      tag: contextProductDetail.tag,
      type: contextProductDetail.type,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.price) {
        errors.price = "Required";
      }

      if (!values.tag) {
        errors.tag = "Required";
      }

      return errors;
    },
  });

  const name = useField("name", form);
  const price = useField("price", form);
  const tag = useField("tag", form);
  const type = useField("type", form);

  return (
    <ProfileLayout>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <ProductHeading>
                <ProductName>
                  Products / <span>{contextProductDetail.name}</span>
                </ProductName>
                <div>
                  <SubmitButton
                    primary
                    disabled={submitting}
                    onClick={(e) => {
                      e.preventDefault();
                      form.submit();
                    }}
                  >
                    <Typography>Save Changes</Typography>
                  </SubmitButton>
                </div>
              </ProductHeading>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <MainCard content={false}>
                  <CardContent>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <Form onSubmit={handleSubmit}>
                          <FormContainer>
                            <FormField small label="Name" name="name">
                              <TextInput
                                {...name.input}
                                placeholder="Sample Product"
                              />
                            </FormField>
                            <ErrorContainer>
                              {name.meta.touched && name.meta.error && (
                                <Error>{name.meta.error}</Error>
                              )}
                            </ErrorContainer>

                            <FormField small label="Price" name="price">
                              <TextInput
                                {...price.input}
                                placeholder="320.99"
                              />
                            </FormField>
                            <ErrorContainer>
                              {price.meta.touched && price.meta.error && (
                                <Error>{price.meta.error}</Error>
                              )}
                            </ErrorContainer>
                            <FormField small label="Tag" name="tag">
                              <TextInput
                                {...tag.input}
                                placeholder="$3m coverage"
                              />
                            </FormField>
                            <ErrorContainer>
                              {tag.meta.touched && tag.meta.error && (
                                <Error>{tag.meta.error}</Error>
                              )}
                            </ErrorContainer>
                          </FormContainer>
                        </Form>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <MainCard content={false}>
                  <CardContent>
                    <OptionsForm small />
                  </CardContent>
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <FormField small label="Type" name="type">
                      <CreateSelect {...type.input} />
                    </FormField>
                    <ErrorContainer>
                      {type.meta.touched && type.meta.error && (
                        <Error>{type.meta.error}</Error>
                      )}
                    </ErrorContainer>
                    <PromoForm small />
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
