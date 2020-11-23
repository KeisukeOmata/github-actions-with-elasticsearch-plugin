import Link from "next/link";

export const BackTop: React.FC = () => (
  <Link href="/" passHref>
    <a className="back-top">Topへ</a>
  </Link>
);