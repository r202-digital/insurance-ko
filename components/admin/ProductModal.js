import React, { useState } from "react";
import { Button, Form, TextInput } from "grommet";
import axios from "axios";
import styled from "styled-components";
import { customAlphabet } from "nanoid";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StyledFormField } from "components/shared/form/fields";
import { useField, useForm } from "react-final-form-hooks";
import PromoForm from "./PromoForm";
import OptionsForm from "./OptionsForm";
import { breakpoint } from "styled-components-breakpoint";
import PromoContext from "./context/promo-context";
import OptionsContext from "./context/options-context";
import ProductsContext from "./context/product-context";
import CreateSelect from "components/shared/form/creatable-select";
import { ModalHeading } from "components/shared/section";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import { ImSpinner3 } from "react-icons/im";

const FormContainer = styled.div`
  text-align: initial;
`;

const FormField = styled(StyledFormField)`
  margin-bottom: 0;
`;

const SubmitButton = styled(Button)`
  margin-top: 2em;

  width: 100%;

  ${BreakpointQuery("lg")`
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const AddButton = styled(Button)`
  transition: 0.3s;
  border-radius: 50%;
  padding: 0.5em;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const SpinningIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin 1.5s infinite linear;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

const ButtonLabel = styled.span`
  display: flex;
  align-items: center;

  ${SpinningIcon} {
    margin-left: 0.5em;
  }
`;

export default function ProductModal() {
  const promoContainer = PromoContext.useContainer();
  const optionsContainer = OptionsContext.useContainer();
  const productsContainer = ProductsContext.useContainer();

  const desktop = useMediaQuery("(min-width:768px)");
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "6px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: desktop ? "400px" : "300px",
      height: "400px",
      overflow: "scroll",
    },
    primaryLight: {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [allSubmitting, setAllSubmitting] = useState(false);

  const onSubmit = async (val) => {
    setAllSubmitting(true);
    try {
      const nanoid = customAlphabet("1234567890", 10);
      const newArr = [...productsContainer.contextProducts];
      const item = {
        uid: nanoid(),
        ...val,
        promos: promoContainer.contextPromo,
        planOptions: optionsContainer.contextOptions,
      };

      if (!optionsContainer.contextOptions.length) {
        throw "Please create plan options";
      }
      await axios.post("/api/create-product", item);

      // Deploy so we can load products
      await axios.get(
        "https://api.vercel.com/v1/integrations/deploy/prj_BTku6lN9lWyLUloUYAQoxqorvY8R/YotmKWQP0J"
      );
      await axios.get(
        "https://api.vercel.com/v1/integrations/deploy/prj_BTku6lN9lWyLUloUYAQoxqorvY8R/z7WmQIgpda"
      );

      newArr.push(item);
      productsContainer.setContextProducts(newArr);
      setFormError("");
      handleClose();
    } catch (e) {
      setFormError(e.message || e);
    }
    setAllSubmitting(false);
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormError("");
    setOpen(false);
    promoContainer.setContextPromo([]);
    optionsContainer.setContextOptions([]);
    form.reset();
  };

  const name = useField("name", form);
  const price = useField("price", form);
  const tag = useField("tag", form);
  const type = useField("type", form);

  return (
    <div>
      <AddButton
        onClick={handleOpen}
        icon={<AddIcon fontSize="small" className={classes.primaryLight} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <ModalHeading variant="h3" hasMarginTop>
            Create Product
          </ModalHeading>
          <Form onSubmit={handleSubmit}>
            <FormContainer>
              <FormField small label="Name" name="name">
                <TextInput {...name.input} placeholder="Sample Product" />
              </FormField>
              <ErrorContainer>
                {name.meta.touched && name.meta.error && (
                  <Error>{name.meta.error}</Error>
                )}
              </ErrorContainer>

              <FormField small label="Price" name="price">
                <TextInput {...price.input} placeholder="320.99" />
              </FormField>
              <ErrorContainer>
                {price.meta.touched && price.meta.error && (
                  <Error>{price.meta.error}</Error>
                )}
              </ErrorContainer>
              <FormField small label="Tag" name="tag">
                <TextInput {...tag.input} placeholder="$3m coverage" />
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
          <PromoForm />
          <OptionsForm />
          <ErrorContainer>
            {!!formError && <Error>{formError}</Error>}
          </ErrorContainer>
          <SubmitButton
            primary
            label={
              <ButtonLabel>
                <span>Confirm</span>
                {submitting && (
                  <SpinningIcon>
                    <ImSpinner3 />
                  </SpinningIcon>
                )}
              </ButtonLabel>
            }
            onClick={form.submit}
            disabled={pristine || submitting || allSubmitting}
          />
        </div>
      </Modal>
    </div>
  );
}
