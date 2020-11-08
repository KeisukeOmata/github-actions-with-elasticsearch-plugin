import * as React from 'react';
import { NextPage } from 'next'
import { GetStaticProps } from "next";
import { Api } from '../../types/api';

type Props = {
  post: Api;
};

// api key
const key = {
  headers: {'X-API-KEY': process.env.API_KEY},
};

// パスを返却
export const getStaticPaths = async () => {
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    .then(res => res.json())
    .catch(() => null);
  // パスを作成
  const paths = data.contents.map(content => `/posts/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

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
  };
};

const Post: NextPage<Props> = ({ post }) => {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.publishedAt}</p>
      {/* コードからHTMLを設定することはXSS攻撃の温床となるため、dangerouslySetInnerHTMLを使う */}
      <div
        dangerouslySetInnerHTML={{
          __html: `${post.body}`,
        }}
      />
    </main>
  );
}

export default Post