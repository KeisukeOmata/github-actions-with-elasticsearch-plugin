import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from "next";
import { Api } from '../../types/api';
import styles from '../../layouts/index.module.scss'

type Props = {
  blog: Api;
};

export type Api2 = {
  id: string;
  title: string;
  body: string;
  publishedAt?: Date;
  category: {
    name: string
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/blog/${content.id}`);
  return {paths, fallback: true};
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://isrbrog.microcms.io/api/v1/posts/' + id, key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  };
};

export default (props: Api2) => {
// const BlogId: NextPage<Props> = ({ blog }) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{props.title}</h1>
      <p className={styles.publishedAt}>{props.publishedAt}</p>
      {/* <p className={styles.category}>{props.category.name}</p> */}
      <div
        dangerouslySetInnerHTML={{
          __html: `${props.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// export default BlogId
