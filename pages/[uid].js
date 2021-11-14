import React, { useEffect } from "react";

import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone.js";

import { queryRepeatableDocuments } from "utils/queries";

import { Client } from "utils/prismicHelpers";
import ErrorPage from "pages/404";
import MetadataContext from "components/shared/context/metadata";
import { getProducts } from "lib/product";
import ProductContext from "components/shared/context/product";
import axios from "axios";

const Page = ({ doc, menu, metadata, products, uid }) => {
  const metadataContext = MetadataContext.useContainer();
  const productContext = ProductContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
    if (uid === "shop") {
      axios.get(`/api/get-product`).then((res) => {
        const {
          data: { products },
        } = res;
        productContext.setContextProduct(products);
      });
    }
  }, []);

  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div className="page">
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
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
  const { uid } = params;

  const client = Client();

  const promiseArray = [
    client.getByUID("page", uid, ref ? { ref } : null),
    client.getSingle("menu", ref ? { ref } : null),
    client.getSingle("metadata", ref ? { ref } : null),
  ];

  const promises = await Promise.all(promiseArray);

  const doc = promises[0] || {};
  const menu = promises[1] || {};
  const metadata = promises[2] || {};

  return {
    props: {
      preview,
      menu,
      metadata,
      doc,
      uid,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );

  return {
    paths: documents.map((doc) => `/${doc.uid}`),
    fallback: false,
  };
}

export default Page;
