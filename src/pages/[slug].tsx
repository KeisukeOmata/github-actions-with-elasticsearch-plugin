// [slug].tsx
// URL「/*」で表示できる

import { GetStaticProps, GetStaticPaths } from "next";

type Props = {
  slug: string;
  time: number;
};

// propsを作成
// 引数には動的パラメータを含むコンテキストが渡される
// ブログ記事一覧を表示するページの場合、getStaticProps内で記事一覧を取得するAPIを叩き、
// ページに表示するコンポーネントに記事データをProps経由で渡すことで、ビルド時に生成されるHTMLに記事データが含まれるようになる
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      slug: ctx.params.slug as string,
      time: Date.now() as number,
    },
    // revalidateで指定した秒数の間は静的アセットを返す
    // 秒数が経過したら、次のリクエストで一旦はキャッシュを返しつつ、バックグラウンドでもう一度そのページを構築
    revalidate: 30,
  };
};

// パスを返却
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // ISRではpathsは空配列で良い
    paths: [],
    // fallback: trueでpathsに指定しなかったパスも、getStaticPropsの内容に沿って作成
    fallback: true,
  };
};

export default (props: Props) => {
  return (
    <>
      {props.slug}: {props.time}
    </>
  );
};