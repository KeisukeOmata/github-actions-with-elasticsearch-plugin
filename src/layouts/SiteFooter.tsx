import { ContentWrapper } from "@src/layouts/ContentWrapper";
import { Config } from "@src/foundations/site.config";

export const SiteFooter: React.FC = () => (
  <footer className="site-footer">
    <ContentWrapper>
      <p>© {Config.siteMeta.copyright}</p>
    </ContentWrapper>
  </footer>
);
