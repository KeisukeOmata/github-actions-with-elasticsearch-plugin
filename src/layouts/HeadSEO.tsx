import Head from "next/head";
import { Config } from "@src/foundations/site.config";

type Props = {
  title: string;
  path?: string;
  description?: string;
  ogImageUrl?: string;
  noindex?: boolean;
  titleFlg?: boolean;
};

export const HeadSEO: React.FC<Props> = (props) => {
  const {
    path,
    title,
    description,
    ogImageUrl,
    noindex,
    titleFlg,
  } = props;
  const pageUrl = `${Config.siteRoot}${path || ""}`;
  return (
    <Head>
      <title>
        {titleFlg
          // titleFlgがtrueの場合、propsのtitleを使う
          ? title
          // titleFlgがtrue以外の場合、propsのtitleまたはコンフィグのtitleを使う
          : `${title} | ${Config.siteMeta.title}`}
      </title>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site" content={Config.siteMeta.title} />
      <meta
        property="og:image"
        content={ogImageUrl || `${Config.siteRoot}/og.png`}
      />
      {/* 該当ページの説明文・要約 */}
      {/* undefined未対応のプラウザのために二重否定の論理演算子 */}
      {!!description && (
        // descriptionがtrueの場合
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}
      {/* インデックス最適化 */}
      {/* hrefに正規ページのURLを設定 */}
      {path && <link rel="canonical" href={pageUrl} />}
      {/* noindexがtrueの場合、インデックスされないようにする */}
      {noindex && <meta name="robots" content="noindex" />}
    </Head>
  )
}