import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import { useUser } from "lib/hooks";
import { getProduct, getProducts } from "lib/product";
import ProductDetails from "components/profile/product/ProductDetails";

const ProductDetailsPage = ({ metadata, data }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    Router.prefetch("/profile/products");
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return <ProductDetails data={data} />;
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
    paths: data.map((item) => `/profile/product/${item.uid}`),
    fallback: false,
  };
}

export default withAuthSync(ProductDetailsPage);
