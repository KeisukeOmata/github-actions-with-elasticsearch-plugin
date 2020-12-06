import { useState } from "react";
import Link from "next/link";
import { Api } from '@src/types/api';
import dayjs from "dayjs";

const BlogLink: React.FC<{ blog: Api }> = (props) => { 
  const {
    id,
    title,
    publishedAt,
  } = props.blog;

  return (
    <>
      <article className="blog-link">
        <Link
          key={`blog-${id}`}
          href={`blog/${id}`}
          passHref
        >
          <a className="blog-link__main-link">
            <h2 className="blog-link__title">{title}</h2>
          </a>
        </Link>
        <time dateTime={publishedAt} className="blog-link__date">
          {dayjs(publishedAt).format('YYYY/MM/DD')}
        </time>
      </article>
    </>
  )
}

export const BlogList: React.FC<{ blogs: Api[] }> = (props) => {
  // ブログの初期表示数
  const [blogsCount, setBlogsCount] = useState<number>(1);
  // ブログの総数
  const totalBlogsCount = props.blogs?.length || 0;
  // 未表示のブログ数
  const remainBlogs = totalBlogsCount - blogsCount > 0;

  if (!totalBlogsCount) {
    return (
      <div className="blog-list-empty">No Blogs yet</div>
    ) 
  }

  return (
    <>
      <div className="blog-list">
        {/* 文字列を変更せず、文字列の一部分を新しい文字列として返す */}
        {props.blogs.slice(0, blogsCount).map((blog, i) => (
          <BlogLink key={`post-item-${i}`} blog={blog} />
        ))}
      </div>
      {/* 未表示のブログがあればボタンを表示する */}
      {remainBlogs && (
        <div className="blog-list-load">
          <button
            onClick={() => setBlogsCount(blogsCount + 1)}
            className="blog-list-load__button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  )
}
