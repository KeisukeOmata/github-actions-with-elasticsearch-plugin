import Link from "next/link";
import { config } from "@src/foundations/site.config";
import { ContentWrapper } from "@src/layouts/ContentWrapper";

export const SiteHeader: React.FC = () => (
  <header className="site-header">
    <ContentWrapper>
      <div className="site-header__inner">
        <Link href="/" passHref>
          <a className="site-header__logo-link">
            <img
              src="/logo.svg"
              alt={config.siteMeta.title}
              className="site-header__logo-img"
            />
          </a>
        </Link>
        {/* site.configのheaderLinksを表示 */}
        <div className="site-header__links">
          {config.headerLinks.map((link, i) => {
            // keyを作成
            const key = `header-link-${i}`;
            // サイト内リンクの場合
            if (link.href.startsWith("/")) {
              return (
                <Link key={key} href={link.href} passHref>
                  <a className="site-header__link">{link.title}</a>
                </Link>
              );
            }
            // サイト外リンクの場合
            return (
              <a key={key} href={link.href} className="site-header__link">
                {link.title}
              </a>
            );
          })}
        </div>
      </div>
    </ContentWrapper>
  </header>
)