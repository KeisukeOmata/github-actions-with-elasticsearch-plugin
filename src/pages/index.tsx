import Link from 'next/link';

export default function Home({ blog }) {
  return (
    <div>
      {blog.map(blog => (
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
  try {
    const key = {
      headers: {'X-API-KEY': process.env.API_KEY},
    };
    const result = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    const postContents = await result.json()
    const post = postContents.contents
    return {
      props: { post },
      revalidate: 60,
    }
  } catch (e) {
    console.log({ e })
  }
}