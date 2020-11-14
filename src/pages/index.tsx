import Link from 'next/link';
import { NextPage } from 'next';
import { axiosInstance } from '../foundations/lib/api';
import { Api } from '../types/api';

type Props = {
  posts: Api[];
};

const PostPage: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map(blog => (
        <ul key={blog.title}>
          <li >
            <Link href={`posts/${blog.title}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axiosInstance.get(
    `https://hn.algolia.com/api/v1/search?query=react`,
  );
  const data: Api[] = await res.data.hits;
  return {
    props: {
      posts: data,
    },
  };
};

export default PostPage;
