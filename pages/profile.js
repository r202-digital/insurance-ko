import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { withAuthSync } from "utils/auth";
import DefaultLayout from "layouts";
import fetcher from "lib/fetcher";
import { Client } from "utils/prismicHelpers";
import MetadataContext from "components/shared/context/metadata";
import DashboardLayout from "components/profile";

const Profile = ({ metadata }) => {
  const router = useRouter();
  const { data: user, error } = useSWR("/api/profile", fetcher);
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  useEffect(() => {
    if (error) router.push("/");
  }, [error, router]);

  if (error) {
    return (
      <DefaultLayout>
        <h1>An error has occurred: {error.message}</h1>
      </DefaultLayout>
    );

    // return (
    //   <DefaultLayout>
    //     {error ? (
    //       <h1>An error has occurred: {error.message}</h1>
    //     ) : user ? (
    //       <h1>Your user id is {user.userId}</h1>
    //     ) : (
    //       <h1>Loading...</h1>
    //     )}
    //     <style jsx>{`
    //       h1 {
    //         margin-bottom: 0;
    //       }
    //     `}</style>
    //   </DefaultLayout>
    // );
  } else {
    return <DashboardLayout user={user} />;
  }
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
