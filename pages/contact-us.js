import React from "react";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";

const Page = ({ metadata }) => {
  return (
    <DefaultLayout metadata={metadata}>
      <div className="page">Contact Us</div>
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

export default Page;
