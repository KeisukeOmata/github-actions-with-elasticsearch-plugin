import * as React from 'react';
import { GetStaticProps } from "next";
import Link from 'next/link';
import { Api } from '../types/api';

export async function getStaticProps() {
  // api key
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch("https://isrbrog.microcms.io/api/v1/posts", key)
  const postsContents = await res.json()
  const posts = postsContents.contents

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
