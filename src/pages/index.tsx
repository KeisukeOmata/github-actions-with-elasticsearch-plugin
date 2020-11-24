import { NextPage } from 'next'
import { GetStaticProps } from "next";
import { Api } from '@src/types/api';
import { Config } from "@src/foundations/site.config";
import { ContentWrapper, UndoWrapForScroll } from "@src/layouts/ContentWrapper";
import { HeadSEO } from "@src/layouts/HeadSEO";
import { BlogList } from "@src/components/BlogList"

type Props = {
  // Api型の配列
  blog: Api[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  };
};

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <HeadSEO
        title={Config.siteMeta.title}
        description={Config.siteMeta.description}
        path="/"
        titleFlg={true}
      />
      {/* Top */}
      <section className="home-top">
        <ContentWrapper>
          <h1 className="home-top__title">{Config.siteMeta.title}</h1>
          <p className="home-top__description">{Config.siteMeta.description}</p>
        </ContentWrapper>
      </section>
      {/* 記事一覧 */}
      <section>
        <ContentWrapper>
          <div className="home-section-title-container">
            <h2 className="home-section-title">Articles</h2>
          </div>
          <BlogList blogs={ blog as Api[]} />
        </ContentWrapper>
      </section>
    </>
  );
}

export default Home