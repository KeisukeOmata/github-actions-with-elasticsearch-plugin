import React from 'react'
import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Config } from '../foundations/site.config'
import { SiteHeader } from '../layouts/SiteHeader'
import { SiteFooter } from '../layouts/SiteFooter'
import { FixedFooter } from '../layouts/FixedFooter'

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
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="icon" type="image/png" href="pwa.png" sizes="128x128" />
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
