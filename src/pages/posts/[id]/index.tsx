import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from "next";

type Props = {
  title: string
  content: string
}

const dummyData = {
  1: {
    title: 'id1のtitle',
    content: 'id1のcontext',
  },
  2: {
    title: 'id2のtitle',
    content: 'id2のcontext',
  },
}

// パスを返却
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // ISRではpathsは空配列で良い
    paths: [],
    // fallback: trueでpathsに指定しなかったパスも、getStaticPropsの内容に沿って作成
    fallback: true,
  }
}

// propsを作成
// 引数には動的パラメータを含むコンテキストが渡される
// ブログ記事一覧を表示するページの場合、getStaticProps内で記事一覧を取得するAPIを叩き、
// ページに表示するコンポーネントに記事データをProps経由で渡すことで、ビルド時に生成されるHTMLに記事データが含まれるようになる
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const props = dummyData[params!.id as '1' | '2']
  return {
    props,
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 1,
  };
};

const Post: NextPage<Props> = props => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </>
  );
};

export default Post
