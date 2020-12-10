import React from 'react'
import styles from 'styles/layouts/SiteFooter.module.scss'
import { Config } from 'foundations/site.config'
import { ContentWrapper } from 'layouts/ContentWrapper'

export const SiteFooter: React.FC = () => (
  <footer className={styles.siteFooter}>
    <ContentWrapper>
      <p>© {Config.siteMeta.copyright}</p>
    </ContentWrapper>
  </footer>
)
