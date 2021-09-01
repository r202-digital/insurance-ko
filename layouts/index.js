import useSWR from "swr";
import fetcher from "lib/fetcher";
import Header from "components/header";
import Footer from "components/footer";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 460px);
  background-color: #fafafa;
  ${breakpoint("lg")`
    min-height: calc(100vh - 320px);
  `}
`;

const Layout = ({ children }) => {
  const { data: user, error } = useSWR("/api/profile", fetcher);

  return (
    <>
      <Header hasUser={!!user} />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
