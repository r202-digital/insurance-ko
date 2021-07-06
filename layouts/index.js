import useSWR from "swr";
import fetcher from "lib/fetcher";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ menu, children }) => {
  const { data: user, error } = useSWR("/api/profile", fetcher);

  return (
    <>
      <Header menu={menu} hasUser={!!user} />

      <main>
        <div className="container">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
