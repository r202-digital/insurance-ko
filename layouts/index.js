import Header from "components/header";
import Footer from "components/footer";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { useUser } from "lib/hooks";
import { BreakpointQuery } from "components/shared/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 460px);
  background-color: #fafafa;
  ${BreakpointQuery("lg")`
    min-height: calc(100vh - 320px);
  `}
`;

const Layout = ({ children }) => {
  const user = useUser();
  return (
    <>
      <Header hasUser={user?.hasUser} user={user && user.user} />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
