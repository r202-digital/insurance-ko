import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import { useUser } from "lib/hooks";
import { getProduct, getProducts } from "lib/product";
import ProductDetails from "components/admin/product/ProductDetails";
import PromoContext from "components/admin/context/promo-context";
import OptionsContext from "components/admin/context/options-context";
import ProductDetailContext from "components/admin/context/product-detail-context";

const ProductDetailsPage = ({ metadata, data }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    Router.prefetch("/admin/products");
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return (
    <ProductDetailContext.Provider initialState={data}>
      <PromoContext.Provider initialState={data.promos}>
        <OptionsContext.Provider initialState={data.planOptions}>
          <ProductDetails />
        </OptionsContext.Provider>
      </PromoContext.Provider>
    </ProductDetailContext.Provider>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;

  const data = await getProduct(params.uid);

  const client = Client();

  const metadata =
    (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      metadata,
      preview,
      data,
    },
  };
}

export async function getStaticPaths() {
  const data = await getProducts();

  return {
    paths: data.map((item) => `/admin/product/${item.uid}`),
    fallback: false,
  };
}

export default withAuthSync(ProductDetailsPage);
