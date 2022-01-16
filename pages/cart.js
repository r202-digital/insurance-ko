import CartGrid from "components/cart/grid";
import VariantContext from "components/product/context";
import { DesktopContainer } from "components/shared/container";
import MetadataContext from "components/shared/context/metadata";
import DefaultLayout from "layouts";
import React, { useEffect } from "react";
import { Client } from "utils/prismicHelpers";
import styled from "styled-components";

const CartContainer = styled(DesktopContainer)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CartPage = ({ metadata = {} }) => {
  const metadataContext = MetadataContext.useContainer();
  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return (
    <DefaultLayout>
      <VariantContext.Provider>
        <CartContainer>
          <CartGrid />
        </CartContainer>
      </VariantContext.Provider>
    </DefaultLayout>
  );
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();
  const metadata =
    (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      metadata,
      preview,
    },
  };
}

export default CartPage;
