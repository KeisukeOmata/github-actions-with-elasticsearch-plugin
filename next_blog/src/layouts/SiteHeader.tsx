import Link from "next/link";
import { Config } from "@src/foundations/site.config";
import { ContentWrapper } from "@src/layouts/ContentWrapper";
import { DarkMode } from "@src/components/DarkMode";

export const SiteHeader: React.FC = () => (
  <header className="site-header">
    <ContentWrapper>
      <div className="site-header__inner">
        <Link href="/" passHref>
          <a className="site-header__logo-link">
            <img
              src="/logo.svg"
              // スクリーンリーダーでWebページを読む人のためにimgのalt属性を指定する
              // 不要な画像にも alt="" を設定する
              // SVGの場合はaria-label属性を指定、画像として使う場合は role="img" を指定
              // SVGをボタンとして使う場合はbuttonタグで囲い、aria-label属性もbuttonで指定
              // <button><svg role="img" aria-label="説明"></svg></button>
              alt={Config.siteMeta.title}
              className="site-header__logo-img"
            />
          </a>
        </Link>
        {/* site.configのheaderLinksを表示 */}
        <div className="site-header__links">
          {Config.headerLinks.map((link, i) => {
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
          <DarkMode />
        </div>
      </div>
    </ContentWrapper>
  </header>
)