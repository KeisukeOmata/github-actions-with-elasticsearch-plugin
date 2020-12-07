import '@src/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Config } from '@src/foundations/site.config'
import { SiteHeader } from '@src/layouts/SiteHeader'
import { SiteFooter } from '@src/layouts/SiteFooter'
import { FixedFooter } from '@src/layouts/FixedFooter'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
      <FixedFooter>
        <SiteHeader />
        <Component {...pageProps} />
        <SiteFooter />
      </FixedFooter>
    </>
  )
}

export default MyApp
