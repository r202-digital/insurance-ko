import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import AdminLayout from "components/profile/admin/AdminLayout";
import { useUser } from "lib/hooks";

const AdminProfile = ({ metadata }) => {
  const user = useUser();
  const metadataContext = MetadataContext.useContainer();

  // console.log(user);
  useEffect(() => {
    Router.prefetch("/profile/products");
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  // useEffect(() => {
  //   if (error) router.push("/");
  // }, [error, router]);

  // if (error) {
  //   return (
  //     <DefaultLayout>
  //       <h1>An error has occurred: {error.message}</h1>
  //     </DefaultLayout>
  //   );

  //   // return (
  //   //   <DefaultLayout>
  //   //     {error ? (
  //   //       <h1>An error has occurred: {error.message}</h1>
  //   //     ) : user ? (
  //   //       <h1>Your user id is {user.userData}</h1>
  //   //     ) : (
  //   //       <h1>Loading...</h1>
  //   //     )}
  //   //     <style jsx>{`
  //   //       h1 {
  //   //         margin-bottom: 0;
  //   //       }
  //   //     `}</style>
  //   //   </DefaultLayout>
  //   // );
  // } else {
  return <AdminLayout />;
  // }
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
