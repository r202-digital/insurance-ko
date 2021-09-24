import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import DashboardLayout from "components/profile";
import { useUser } from "lib/hooks";

const Profile = ({ metadata }) => {
  const user = useUser();
  const metadataContext = MetadataContext.useContainer();

  // console.log(user);
  useEffect(() => {
    Router.prefetch("/profile/products");
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
