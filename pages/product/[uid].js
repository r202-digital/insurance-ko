import React, { useEffect, useState } from "react";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import ErrorPage from "pages/404";
import { RichText } from "prismic-reactjs";
import { DesktopContainer } from "components/shared/container";
import axios from "axios";
import { getProduct, getProducts } from "lib/product";
import MetadataContext from "components/shared/context/metadata";
import ProductHero from "components/product/hero";
import ProductTabs from "components/product/tabs";
import VariantContext from "components/product/context";
import ProfileDetailsContext from "components/profile/context/profile-details-context";
import Recommendations from "components/product/recommendations";
import { useUser } from "lib/hooks";
import { initialProfileDetails } from "lib/constant";

const ProductPage = ({ productProps = {}, metadata = {} }) => {
  const metadataContext = MetadataContext.useContainer();
  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  if (!!Object.keys(productProps).length) {
    return (
      <DefaultLayout>
        <VariantContext.Provider>
          <DesktopContainer>
            <ProductHero product={productProps} />
            <ProductTabs product={productProps} />
            <Recommendations product={productProps} />
          </DesktopContainer>
        </VariantContext.Provider>
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
