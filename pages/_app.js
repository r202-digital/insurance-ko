import { Grommet } from "grommet";
import Head from "next/head";
import theme from "lib/theme";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "@fontsource/montserrat";
import "@fontsource/lato";
import "@fontsource/lato/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <Head>
        <title>InsuranceKo</title>
      </Head>
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
