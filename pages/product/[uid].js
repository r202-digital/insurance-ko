import VariantContext from "components/product/context";
import ProductHero from "components/product/hero";
import Recommendations from "components/product/recommendations";
import ProductTabs from "components/product/tabs";
import { DesktopContainer } from "components/shared/container";
import MetadataContext from "components/shared/context/metadata";
import ProductDetailContext from "components/shared/context/product-detail";
import DefaultLayout from "layouts";
import { getProduct, getProducts } from "lib/product";
import ErrorPage from "pages/404";
import React, { useEffect } from "react";
import { Client } from "utils/prismicHelpers";

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
            <ProductDetailContext.Provider initialState={productProps}>
              <ProductHero />
              <ProductTabs />
              <Recommendations />
            </ProductDetailContext.Provider>
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
