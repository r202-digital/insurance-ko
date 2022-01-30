import CartGrid from "components/cart/grid";
import VariantContext from "components/product/context";
import { DesktopContainer } from "components/shared/container";
import MetadataContext from "components/shared/context/metadata";
import DefaultLayout from "layouts";
import React, { useEffect } from "react";
import { Client } from "utils/prismicHelpers";
import styled from "styled-components";
import { getProduct, getProducts } from "lib/product";
import ProductDetailContext from "components/shared/context/product-detail";
// import Cookies from "js-cookie";

const CartContainer = styled(DesktopContainer)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CheckoutPage = ({ productProps = {}, metadata = {} }) => {
  const metadataContext = MetadataContext.useContainer();
  // const option = Cookies.get("option");
  // console.log(option);
  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return (
    <DefaultLayout>
      <VariantContext.Provider>
        <ProductDetailContext.Provider initialState={productProps}>
          <CartContainer>
            <CartGrid />
          </CartContainer>
        </ProductDetailContext.Provider>
      </VariantContext.Provider>
    </DefaultLayout>
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
    paths: products.map((product) => `/buy/${product.uid}`),
    fallback: true,
  };
}

export default CheckoutPage;
