import * as React from 'react';
import { GetStaticProps } from "next";
import Link from 'next/link';
import { Api } from '../types/api';

type Props = {
  // Api型の配列
  data: Api[];
};

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
      data,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 10, 
  };
};

export default function Posts({ data }) {
  return (
    <>
      {data.contents.map(post => (
        <ul key={post.id}>
          <li>
            <Link href={`posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        </ul>
      ))}
    </>
  );
}

