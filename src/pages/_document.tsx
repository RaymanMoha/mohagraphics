import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class PortfolioDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const renderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => renderPage({
        enhanceApp: (App) => function StyledApp(props) {
          return sheet.collectStyles(<App {...props} />);
        },
      });
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, styles: <>{initialProps.styles}{sheet.getStyleElement()}</> };
    } finally {
      sheet.seal();
    }
  }

  render() { return (
    <Html lang="en">
      <Head>
        {/* Google Analytics (GA4) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E7GVNYS50S"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E7GVNYS50S', {
                send_page_view: true
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  ); }
}

