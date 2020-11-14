function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
  const postsContents = await res.json()
  const postsParse = postsContents.contents
  const posts = JSON.parse(JSON.stringify(postsParse))

  return {
    props: {
      posts: posts
    },
    revalidate: 1,
  }
}

export default Blog