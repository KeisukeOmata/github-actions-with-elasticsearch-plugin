import * as React from 'react';
import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from "next";
import { Api } from '../../types/api';

type Props = {
  post: Api;
};

// api key
const key = {
  headers: {'X-API-KEY': process.env.API_KEY},
};

// パスを返却
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // ISRではpathsは空配列で良い
    paths: [],
    // fallback: trueでpathsに指定しなかったパスも、getStaticPropsの内容に沿って作成
    fallback: true,
  }
}

// propsを作成
// 引数には動的パラメータを含むコンテキストが渡される
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params.id;
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts/' + id, key,)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    // 1秒ごとにブログ記事を読み込む
    revalidate: 1,
  };
};

const Post: NextPage<Props> = props => {
  return (
    <main>
      <h1>{props.post.title}</h1>
      <p>{props.post.publishedAt}</p>
      {/* コードからHTMLを設定することはXSS攻撃の温床となるため、dangerouslySetInnerHTMLを使う */}
      <div
        dangerouslySetInnerHTML={{
          __html: `${props.post.body}`,
        }}
      />
    </main>
  );
}

export default Post