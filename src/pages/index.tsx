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
        <ul key={blog.id}>
          <li >
            <Link href={`posts/${blog.id}`}>
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
    `https://isrbrog.microcms.io/api/v1/posts`,
  );
  const data: Api[] = await res.data.contents;
  return {
    props: {
      posts: data,
    },
  };
};

export default PostPage;
