import React, { useEffect } from "react";
import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import { RichText } from "prismic-reactjs";

const About = ({ doc, metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);
  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div className="about">
          <SliceZone sliceZone={doc.data.body} />
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

  const doc = (await client.getSingle("about", ref ? { ref } : null)) || {};
  const menu = (await client.getSingle("menu", ref ? { ref } : null)) || {};
  const metadata = (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      doc,
      menu,
      metadata,
      preview,
    },
  };
}

export default About;
