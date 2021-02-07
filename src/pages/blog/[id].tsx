import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Api } from 'lib/type'
import { ContentWrapper } from 'components/layouts/ContentWrapper'

type Props = {
  blog: Api
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
  const id = context.params?.id
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const data = await fetch(
    'https://isrbrog.microcms.io/api/v1/posts/' + id,
    key
  )
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
      blog: data,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  }
}

const Blog: NextPage<Props> = ({ blog }) => {
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
          <h1>{blog.title}</h1>
          <p>{blog.publishedAt}</p>
          {/* nullを許容 */}
          <p>{blog.category?.name}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </ContentWrapper>
      </div>
    </>
  )
}

export default Blog
