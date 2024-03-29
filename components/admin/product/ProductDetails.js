// material-ui
import { CardContent, Grid, Typography } from "@material-ui/core";
import axios from "axios";
// project imports
import MainCard from "components/cards/MainCard";
import { Colors } from "components/shared/colors";
import CreateSelect from "components/shared/form/creatable-select";
import { StyledFormField } from "components/shared/form/fields";
import { Flex } from "components/shared/section";
import { Button, Form, TextInput } from "grommet";
import { gridSpacing } from "lib/constant";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useField, useForm } from "react-final-form-hooks";
import styled from "styled-components";
import OptionsForm from "../OptionsForm";
import PromoForm from "../PromoForm";
import OptionsContext from "../context/options-context";
import ProductDetailContext from "../context/product-detail-context";
import PromoContext from "../context/promo-context";
import ProfileLayout from "../ProfileLayout";
import KycForm from "../KycForm";
import TermsContext from "../context/terms-context";
import Link from "next/link";

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

const SuccessMessage = styled(Typography)`
  color: ${Colors.lightgreen};
  margin-right: 1rem;
  font-weight: 600;
`;

const UnsavedMessage = styled(Typography)`
  color: ${Colors.tagRed};
  margin-right: 1rem;
  font-weight: 600;
`;

const BackLink = styled.a`
  text-decoration: initial;
  color: ${Colors.textGray};

  &:hover {
    font-weight: 700;
  }
`;

const ProductDetails = () => {
  const productDetailContainer = ProductDetailContext.useContainer();
  const promoContainer = PromoContext.useContainer();
  const optionContainer = OptionsContext.useContainer();
  const termsContainer = TermsContext.useContainer();
  const { contextProductDetail, setContextProductDetail } =
    productDetailContainer;
  const { contextPromo } = promoContainer;
  const { contextOptions } = optionContainer;
  const { contextTerms } = termsContainer;
  const [success, setSuccess] = useState(false);
  const newVals = {
    ...contextProductDetail,
    promos: contextPromo,
    planOptions: contextOptions,
    terms: contextTerms,
  };
  const onSubmit = async (val) => {
    const obj = {
      ...contextProductDetail,
      ...val,
      promos: contextPromo,
      planOptions: contextOptions,
      terms: contextTerms,
    };
    setContextProductDetail(obj);

    await axios.post("/api/update-product", obj);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const otherValPristine =
    JSON.stringify(contextProductDetail) === JSON.stringify(newVals);

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
                  <Link href="/admin/products">
                    <BackLink href="/admin/products">Products</BackLink>
                  </Link>{" "}
                  / <span>{contextProductDetail.name}</span>
                </ProductName>
                <Flex>
                  {success && <SuccessMessage>Success!</SuccessMessage>}
                  {!(pristine && otherValPristine) && (
                    <UnsavedMessage>Unsaved Changes</UnsavedMessage>
                  )}
                  <div>
                    <SubmitButton
                      primary
                      disabled={submitting || (pristine && otherValPristine)}
                      onClick={(e) => {
                        e.preventDefault();
                        form.submit();
                      }}
                    >
                      <Typography>Save Changes</Typography>
                    </SubmitButton>
                  </div>
                </Flex>
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
            <Grid item xs={12}></Grid>
            <MainCard content={false} sx={{ marginBottom: "24px" }}>
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
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <KycForm small />
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
