import type { AppProps } from 'next/app'
import '@src/styles/globals.scss'
import { SiteHeader } from "@src/layouts/SiteHeader";
import { SiteFooter } from "@src/layouts/SiteFooter";
import { FixedFooter } from "@src/layouts/FixedFooter";
import { Space } from "@src/components/Space";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FixedFooter>
        <SiteHeader />
        <Component {...pageProps} />
        <Space />
        <SiteFooter />
      </FixedFooter>
    </>
  )
}

export default MyApp
