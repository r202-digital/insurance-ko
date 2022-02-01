import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, Form, TextInput } from "grommet";
import styled from "styled-components";
import { StyledFormField } from "components/shared/form/fields";
import { breakpoint } from "styled-components-breakpoint";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { FaTrash, FaPen } from "react-icons/fa";
import { ModalHeading } from "components/shared/section";
import ProductsContext from "./context/product-context";
import Router from "next/router";
import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import { ImSpinner3 } from "react-icons/im";

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

const ActionButton = styled(Button)`
  transition: 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${SubmitButton}:first-of-type {
    margin-right: 0.5em;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
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

export default function DeleteModal({ product, index }) {
  const productsContainer = ProductsContext.useContainer();
  const { contextProducts, setContextProducts } = productsContainer;
  const desktop = useMediaQuery("(min-width:768px)");
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "6px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: desktop ? "400px" : "300px",
      height: "230px",
      overflow: "scroll",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/delete-product", {
        uid: product.uid,
      });

      // Deploy so we can load products
      await axios.get(
        "https://api.vercel.com/v1/integrations/deploy/prj_BTku6lN9lWyLUloUYAQoxqorvY8R/YotmKWQP0J"
      );
      await axios.get(
        "https://api.vercel.com/v1/integrations/deploy/prj_BTku6lN9lWyLUloUYAQoxqorvY8R/z7WmQIgpda"
      );

      const newProducts = [...contextProducts];
      newProducts.splice(index, 1);
      setContextProducts(newProducts);
      setOpen(false);
    } catch (e) {
      setFormError(e.message || e);
    }

    setSubmitting(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Flex>
        <ActionButton
          onClick={(e) => {
            e.preventDefault();
            Router.push(`/admin/product/${product.uid}`);
          }}
          icon={<FaPen />}
        />
        <ActionButton onClick={handleOpen} icon={<FaTrash />} />
      </Flex>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <ModalHeading variant="h3">Delete {product.name}</ModalHeading>
          <Typography>
            Are you sure you want to delete {product.name}?
          </Typography>
          <ErrorContainer>
            {!!formError && <Error>{formError}</Error>}
          </ErrorContainer>
          <ButtonContainer>
            <SubmitButton secondary label="Cancel" onClick={handleClose} />
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
              onClick={onSubmit}
              disabled={submitting}
            />
          </ButtonContainer>
        </div>
      </Modal>
    </div>
  );
}
