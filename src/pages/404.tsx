import React from 'react'
import styles from 'styles/pages/404.module.scss'
import { NextPage } from 'next'
import Link from 'next/link'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { HeadSEO } from 'components/layouts/HeadSEO'

const Custom404: NextPage = () => {
  return (
    <>
      {/* 404ページなのでインデックスしない */}
      <HeadSEO title="404 not found" noindex={true} />
      <div className={styles.error}>
        <ContentWrapper>
          <div className={styles.error__status}>404</div>
          <h1 className={styles.error__message}>Page not found...</h1>
          <nav className={styles.error__actions}>
            <Link href="/" passHref>
              <a className={styles.backTop}>Topへ</a>
            </Link>
          </nav>
        </ContentWrapper>
      </div>
    </>
  )
}

export default Custom404
