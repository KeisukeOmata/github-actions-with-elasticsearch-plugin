import * as React from 'react';
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from "next";
import Link from 'next/link';
import { Api } from '../../types/api';

type Props = {
  // Api型の配列
  posts: Api[];
  time: number;
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
export const getStaticProps: GetStaticProps<Props> = async () => {
  // api key
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  // post一覧を取得
  const data = await fetch("https://isrbrog.microcms.io/api/v1/posts", key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
      time: Date.now() as number,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    // 1秒ごとにブログ記事を読み込む
    revalidate: 1,
  };
};

const Posts: NextPage<Props> = props => {
  return (
    <>
      {props.posts.map(post => (
        <ul key={post.id}>
          <li>
            <Link href={`posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        </ul>
      ))}
      <div>{props.time}</div>
    </>
  );
}

export default Posts
