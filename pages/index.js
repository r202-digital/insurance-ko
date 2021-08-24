import React, { useEffect } from "react";
import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";

const HomePage = ({ doc, metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);
  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div className="homepage">
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
      </DefaultLayout>
    );
  }

  // Call the standard error page if the document was not found
  return null;
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const doc = (await client.getSingle("homepage", ref ? { ref } : null)) || {};
  const menu = (await client.getSingle("menu", ref ? { ref } : null)) || {};
  const metadata =
    (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      doc,
      menu,
      metadata,
      preview,
    },
  };
}

export default HomePage;
