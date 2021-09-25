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

const FormContainer = styled.div`
  text-align: initial;
`;

const FormField = styled(StyledFormField)`
  margin-bottom: 0;
`;

const SubmitButton = styled(Button)`
  margin-top: 2em;

  width: 100%;

  ${breakpoint("lg")`
        width: auto;
    `}
`;

const ErrorContainer = styled.div`
  text-align: initial;
  margin-bottom: 1em;
`;

const Error = styled.span`
  color: red;
  font-size: 0.75em;
`;
const ProductDetails = ({ data }) => {
  // console.log(data);
  const onSubmit = (val) => {
    console.log(val);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    initialValues: {
      name: data.name,
      price: data.price,
      tag: data.tag,
      type: data.type,
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
                            <FormField small label="Type" name="type">
                              <CreateSelect {...type.input} />
                            </FormField>
                            <ErrorContainer>
                              {type.meta.touched && type.meta.error && (
                                <Error>{type.meta.error}</Error>
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
                    <OptionsForm />
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
                    <PromoForm />
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
