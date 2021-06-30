import Header from "./Header";
import useSWR from "swr";
import fetcher from "lib/fetcher";

const Layout = (props) => {
  const { data: user, error } = useSWR("/api/profile", fetcher);
  return (
    <>
      <Header />

      <main>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
