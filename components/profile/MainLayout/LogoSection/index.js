import React from "react";

// material-ui
import { ButtonBase } from "@material-ui/core";
import Link from "next/link";
import { Anchor } from "grommet";
import styled from "styled-components";

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoContainer = styled.div`
  height: 50px;
`;

const Logo = styled.img`
  height: 100%;
`;

const LogoSection = () => {
  return (
    <ButtonBase disableRipple component={(props) => <a {...props} />} to={"/"}>
      {/* <Logo /> */}
      <Link href="/">
        <Anchor>
          <LogoContainer>
            <Logo src="/logo/logo.svg" alt="InsuranceKo" />
          </LogoContainer>
        </Anchor>
      </Link>
    </ButtonBase>
  );
};

export default LogoSection;
