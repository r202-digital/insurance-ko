import Document, { Html, Head, Main, NextScript } from "next/document";
import PrismicScript from "components/PrismicScript";
import { ServerStyleSheet } from "styled-components";
// import { getCssText } from "stitches.config";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/logo/logo.ico" />
          <link
            rel="preload"
            href="/fonts/RedRock.ttf"
            as="font"
            crossOrigin=""
          />
          {/* <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <PrismicScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
