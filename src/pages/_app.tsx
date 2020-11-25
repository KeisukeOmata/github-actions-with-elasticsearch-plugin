import type { AppProps } from 'next/app'
import '@src/styles/globals.scss'
import Head from "next/head";
import { Config } from "@src/foundations/site.config";
import { SiteHeader } from "@src/layouts/SiteHeader";
import { SiteFooter } from "@src/layouts/SiteFooter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon shortcut"
          type="image/png"
          href={`${Config.siteRoot}/logo.png`}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
      </Head>
      <div className="wrapper">
        <SiteHeader />
        <Component {...pageProps} />
        <div className="footer-top"></div>
        <SiteFooter />
      </div>
    </>
  )
}

export default MyApp