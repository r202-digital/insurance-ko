import React from "react";
import styled from "styled-components";
import logoSmall from "public/logo/logo-small.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  animation: heartbeat 1.75s infinite;
`;

const LoadingScreen = () => {
  return (
    <Container>
      <Logo src={logoSmall.src} height="100px" />
    </Container>
  );
};

export default LoadingScreen;
