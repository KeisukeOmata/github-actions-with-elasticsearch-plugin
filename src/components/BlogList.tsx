import Link from "next/link";
import { Api } from '@src/types/api';

export const BlogList: React.FC<{ blogs: Api[] }> = (props) => {
  return (
    <>
      {props.blogs.map(blog => (
        <ul key={blog.id}>
          <li >
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        </ul>
      ))}
    </>
  )
}
