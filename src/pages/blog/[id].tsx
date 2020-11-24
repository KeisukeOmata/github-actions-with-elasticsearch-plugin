import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from "next";
import { Api } from '@src/types/api';

type Props = {
  blog: Api;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const key = {
  //   headers: {'X-API-KEY': process.env.API_KEY},
  // };
  // const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
  //   .then(res => res.json())
  //   .catch(() => null);
  // const paths = data.contents.map(content => `/blog/${content.id}`);
  return {
    // ISRではpathsは空配列で良い
    paths: [],
    // fallback: false      => SSRしない。そのpathに対するページは存在しないものとする
    // fallback: true       => SSRする。SSRを待っている間はそれ用の画面を表示する
    // fallback: 'blocking' => SSRする。SSRの間はユーザを待たせる
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts/' + id, key)
    .then(res => res.json())
    .catch(() => null);
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
  };
};

const BlogId: NextPage<Props> = ({ blog }) => {
  const router = useRouter()
  // fallback: 'blocking'であれば不要
  if (router.isFallback) {
    // ビルド中なのでblogはundefinedのまま
    return <div>Loading...</div>
  }
  // ビルドが完了しblogが参照できる
  return (
    <main className="main">
      <h1 className="title">{blog.title}</h1>
      <p className="publishedAt">{blog.publishedAt}</p>
      {/* null許容 */}
      <p className="category">{blog.category?.name}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className="post"
      />
    </main>
  );
}

export default BlogId