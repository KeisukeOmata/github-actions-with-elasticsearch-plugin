import type { AppProps } from 'next/app'
import '@src/styles/globals.scss'
import 'minireset.css'
import { SiteHeader } from "@src/layouts/SiteHeader";
import { SiteFooter } from "@src/layouts/SiteFooter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
      <SiteFooter />
    </>
  )
}

export default MyApp