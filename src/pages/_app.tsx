import type { AppProps } from 'next/app'
import '@src/styles/globals.scss'
import 'minireset.css'
import { SiteFooter } from "@src/layouts/SiteFooter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SiteFooter />
    </>
  )
}

export default MyApp