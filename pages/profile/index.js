import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import DashboardLayout from "components/profile";

const Profile = ({ metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    Router.prefetch("/admin/products");
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return <DashboardLayout />;
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

export default withAuthSync(Profile);
