import * as React from 'react';
import { NextPage } from 'next';
import { GetStaticProps } from "next";
import Link from 'next/link';
import { Api } from '../types/api';

type Props = {
  // Api型の配列
  posts: Api[];
  time: number;
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
      posts: data.contents,
      time: Date.now() as number,
    },
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
