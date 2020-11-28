import { NextPage } from 'next'
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <>
      <div className="error">
        <div className="error__status">404</div>
        <h1 className="error__message">Page not found...</h1>
        <nav className="error__actions">
          <Link href="/" passHref>
            <a className="back-top">Topへ</a>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Custom404