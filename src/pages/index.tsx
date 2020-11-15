import Link from 'next/link'
import { NextPage } from 'next'
import { GetStaticProps } from "next";
import { Api } from '../types/api';

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
