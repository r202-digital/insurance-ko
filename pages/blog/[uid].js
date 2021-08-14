import React from "react";

import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone.js";

import { queryRepeatableDocuments } from "utils/queries";

import { Client } from "utils/prismicHelpers";
import ErrorPage from "pages/404";
import { RichText } from "prismic-reactjs";
import Container from "components/shared/container";

const Page = ({ doc, menu }) => {
  if (doc && doc.data) {
    const { data } = doc;
    return (
      <DefaultLayout menu={menu}>
        <Container>
          <div>
            {data.image && (
              <img src={data.image.url || ""} width="500px" height="200px" />
            )}
            <p>{RichText.asText(doc.data.published_date)}</p>
            <h1>{RichText.asText(doc.data.title)}</h1>
            <p></p>
          </div>
        </Container>
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

  const doc =
    (await client.getByUID("blog_post", params.uid, ref ? { ref } : null)) ||
    {};
  const menu = (await client.getSingle("menu", ref ? { ref } : null)) || {};

  return {
    props: {
      preview,
      menu,
      doc,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "blog_post"
  );
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: true,
  };
}

export default Page;