import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import { useUser } from "lib/hooks";
import AdminDashboardLayout from "components/admin";

const AdminProfile = ({ metadata }) => {
  const user = useUser();
  const metadataContext = MetadataContext.useContainer();

  console.log(user);
  useEffect(() => {
    Router.prefetch("/admin/products");
    Router.prefetch("/admin/analytics");
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return <AdminDashboardLayout />;
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

export default withAuthSync(AdminProfile);
