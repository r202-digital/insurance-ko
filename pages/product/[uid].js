import React, { useEffect } from "react";

import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone.js";

import { queryRepeatableDocuments } from "utils/queries";

import { Client } from "utils/prismicHelpers";
import ErrorPage from "pages/404";
import { RichText } from "prismic-reactjs";
import { Container, DesktopContainer } from "components/shared/container";
import axios from "axios";
import { getProduct, getProducts } from "lib/product";
import MetadataContext from "components/shared/context/metadata";

const ProductPage = ({ productProps = {}, metadata = {} }) => {
  const metadataContext = MetadataContext.useContainer();
  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  if (!!Object.keys(productProps).length) {
    return (
      <DefaultLayout>
        <DesktopContainer>
          <div>This is a {productProps.name} page</div>
        </DesktopContainer>
      </DefaultLayout>
    );
  }

  // Call the standard error page if the document was not found
  return (
    <>
      <ErrorPage />
    </>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;

  const client = Client();

  const promiseArray = [
    client.getSingle("menu", ref ? { ref } : null),
    client.getSingle("metadata", ref ? { ref } : null),
    getProduct(params.uid),
  ];

  const promises = await Promise.all(promiseArray);

  const menu = promises[0] || {};
  const metadata = promises[1] || {};
  const product = promises[2] || {};

  let productProps = {};

  if (!product.error) {
    productProps = product;
  }

  return {
    props: {
      preview,
      menu,
      metadata,
      productProps,
    },
  };
}

export async function getStaticPaths() {
  const products = await getProducts();

  return {
    paths: products.map((product) => `/product/${product.uid}`),
    fallback: true,
  };
}

export default ProductPage;
