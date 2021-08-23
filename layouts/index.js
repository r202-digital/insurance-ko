import useSWR from "swr";
import fetcher from "lib/fetcher";
import Header from "components/header";
import Footer from "components/footer";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";

const Container = styled.div`
  min-height: calc(100vh - 460px);
  ${breakpoint("lg")`
    min-height: calc(100vh - 320px);
  `}
`;

const Layout = ({ menu, children, metadata }) => {
  const { data: user, error } = useSWR("/api/profile", fetcher);
  console.log(metadata);

  return (
    <>
      <Header menu={menu} hasUser={!!user} />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
