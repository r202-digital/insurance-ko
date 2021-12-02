import Header from "components/header";
import Footer from "components/footer";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { useUser } from "lib/hooks";
import { BreakpointQuery } from "components/shared/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fafafa;
  flex: 1;
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
