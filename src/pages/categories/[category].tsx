import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Api } from 'lib/type'
import { ContentWrapper } from 'components/layouts/ContentWrapper'

type Props = {
  categories: Api[]
  name: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // ISRではpathsは空配列で良い
    paths: [],
    // fallback: false      => SSRしない。そのpathに対するページは存在しないものとする
    // fallback: true       => SSRする。SSRを待っている間はそれ用の画面を表示する
    // fallback: 'blocking' => SSRする。SSRの間はユーザを待たせる
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const name = context.params?.category
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    .then((res) => res.json())
    .catch(() => null)
  // fallback: false 以外の場合、リダイレクト先が必要
  if (!data) {
    return {
      // 404.tsxに遷移
      notFound: true,
      // // リダイレクト先を指定
      // redirect: {
      //   destination: '/',
      //   permanent: false,
      // },
    }
  }
  return {
    props: {
      categories: data.contents,
      name: name as string,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  }
}

const Blog: NextPage<Props> = ({ categories, name }) => {
  // fallback: 'blocking'であれば不要
  const router = useRouter()
  if (router.isFallback) {
    // ビルド中なのでblogはundefinedのまま
    return (
      <>
        <ContentWrapper>
          <div>Loading...</div>
        </ContentWrapper>
      </>
    )
  }
  // ビルドが完了しblogが参照できる
  return (
    <>
      <div>
        <ContentWrapper>
          <h1>{name}</h1>
          {categories.map(
            (category, i) =>
              category.category?.name == name && (
                <Link
                  key={`category-${i}`}
                  href={`/blog/${category.id}`}
                  passHref
                >
                  <a>
                    <p>{category.title}</p>
                  </a>
                </Link>
              )
          )}
        </ContentWrapper>
      </div>
    </>
  )
}

export default Blog
