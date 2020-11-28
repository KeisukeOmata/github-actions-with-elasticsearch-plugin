import { NextPage } from 'next'
import { BackTop } from "@src/components/BackTop";

const Custom404: NextPage = () => {
  return (
    <>
      <div className="error">
          <div className="error__status">404</div>
          <h1 className="error__message">Page not found...</h1>
          <nav className="error__actions">
            <BackTop />
          </nav>
      </div>
    </>
  )
}

export default Custom404