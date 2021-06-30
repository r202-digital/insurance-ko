import { Grommet } from "grommet";
import theme from "lib/theme";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "@fontsource/montserrat";

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        @font-face {
          font-family: "RedRock";
          font-style: normal;
          font-weight: normal;
          src: url("/fonts/RedRock.ttf");
        }

        html,
        body {
          margin: 0;
          line-height: 1.5;
          font-weight: 400;
          font-size: 16px;
          box-sizing: border-box;
          width: inherit;
        }
      `}</style>
      <Component {...pageProps} />
    </Grommet>
  );
}

export default MyApp;
