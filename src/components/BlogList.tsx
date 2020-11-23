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
        <Link href={`blog/${id}`} passHref>
          <a className="blog-link_main-link">
            <h2 className="blog-link-title">{title}</h2>
          </a>
        </Link>
        <time dateTime={publishedAt} className="blog-link-time">
          {dayjs(publishedAt).format('YYYY/MM/DD')}
        </time>
      </article>
    </>
  )
}

export const BlogList: React.FC<{ blogs: Api[] }> = (props) => {
  const [displayBlogsCount, setDisplayBlogsCount] = useState<number>(1);
  const totalBlogsCount = props.blogs?.length || 0;
  const canNextLoad = totalBlogsCount - displayBlogsCount > 0;

  if (!totalBlogsCount) {
    return (
      <div className="blog-list-empty">No Blogs yet</div>
    ) 
  }

  return (
    <>
      <div className="blog-list">
        {props.blogs.slice(0, displayBlogsCount).map((blog, i) => (
          <BlogLink key={`post-item-${i}`} blog={blog} />
        ))}
      </div>
      {canNextLoad && (
        <div className="blog-list-load">
          <button
            onClick={() => setDisplayBlogsCount(displayBlogsCount + 1)}
            className="blog-list-load_button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  )
}
