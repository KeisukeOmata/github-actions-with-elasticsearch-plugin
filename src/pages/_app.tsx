import type { AppProps } from 'next/app'
import '@src/layouts/globals.scss'
import 'minireset.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp