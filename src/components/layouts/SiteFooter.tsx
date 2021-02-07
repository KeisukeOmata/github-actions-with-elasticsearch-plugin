import React from 'react'
import styles from 'styles/components/layouts/SiteFooter.module.scss'
import { Config } from 'lib/site.config'
import { ContentWrapper } from 'components/layouts/ContentWrapper'

export const SiteFooter: React.FC = () => (
  <footer className={styles.siteFooter}>
    <ContentWrapper>
      <p>© {Config.siteMeta.copyright}</p>
    </ContentWrapper>
  </footer>
)
