import { ContentWrapper } from "@src/layouts/ContentWrapper";
import { config } from "@site.config";

export const SiteFooter: React.FC = () => (
  <footer className="site-footer">
    <ContentWrapper>
      <p>© {config.siteMeta.copyright}</p>
    </ContentWrapper>
  </footer>
);
