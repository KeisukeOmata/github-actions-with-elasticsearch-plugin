import Link from 'next/link'
import { NextPage } from 'next'
import { GetStaticProps } from "next";
import { Api } from '@src/types/api';

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
      {blog.map(blog => (
        <ul key={blog.id}>
          <li >
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        </ul>
      ))}
    </>
  );
}

export default Home