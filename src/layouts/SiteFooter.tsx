import styles from '@src/styles/layouts/SiteFooter.module.scss'
import { Config } from '@src/foundations/site.config'
import { ContentWrapper } from '@src/layouts/ContentWrapper'

export const SiteFooter: React.FC = () => (
  <footer className={styles.siteFooter}>
    <ContentWrapper>
      <p>© {Config.siteMeta.copyright}</p>
    </ContentWrapper>
  </footer>
)
