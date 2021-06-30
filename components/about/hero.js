import { Box } from "grommet";
import styled from "styled-components";

const Background = styled(Box)`
  min-height: calc(100vh - 80px);
  background-image: url("/design-bg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: calc(100% + 31px);
`;

const Hero = () => {
  return <Background>Hero</Background>;
};

export default Hero;
