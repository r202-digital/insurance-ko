import { Grommet } from "grommet";
import Head from "next/head";
import theme from "lib/theme";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/montserrat";
import "@fontsource/lato";
import "@fontsource/lato/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "hamburgers/dist/hamburgers.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import MetadataContext from "components/shared/context/metadata";
import ProductContext from "components/shared/context/product";

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
        body,
        main {
          height: 100%;
          margin: 0;
          line-height: 1.5;
          font-weight: 400;
          font-size: 16px;
          box-sizing: border-box;
          width: inherit;
        }
      `}</style>
      <ProductContext.Provider>
        <MetadataContext.Provider>
          <Component {...pageProps} />
        </MetadataContext.Provider>
      </ProductContext.Provider>
    </Grommet>
  );
}

export default MyApp;
