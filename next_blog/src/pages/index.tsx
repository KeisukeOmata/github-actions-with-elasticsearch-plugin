import styles from '@src/styles/pages/index.module.scss'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Api } from '@src/types/api'
import { Config } from '@src/foundations/site.config'
import { BlogList } from '@src/components/BlogList'
import { ScrollableCategories } from '@src/components/ScrollableCategories'
import { ContentWrapper, UndoWrapForScroll } from '@src/layouts/ContentWrapper'
import { HeadSEO } from '@src/layouts/HeadSEO'

type Props = {
  blog: Api[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      blog: data.contents,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  }
}

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
      <section className={styles.homeTop}>
        <ContentWrapper>
          <h1 className={styles.homeTop__title}>{Config.siteMeta.title}</h1>
          <p className={styles.homeTop__description}>
            {Config.siteMeta.description}
          </p>
        </ContentWrapper>
      </section>
      {/* 記事一覧 */}
      <section>
        <ContentWrapper>
          <div className={styles.homeSectionTitleContainer}>
            <h2 className={styles.homeSectionTitle}>Articles</h2>
          </div>
          <BlogList blogs={blog as Api[]} />
        </ContentWrapper>
      </section>
      {/* カテゴリ一覧 */}
      <section className={styles.homeCategories}>
        <ContentWrapper>
          <div className={styles.homeSectionTitleContainer}>
            <h2 className={styles.homeSectionTitle}>Categories</h2>
          </div>
          <div className={styles.homeCategoriesContainer}>
            <UndoWrapForScroll>
              <ScrollableCategories />
            </UndoWrapForScroll>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}

export default Home
