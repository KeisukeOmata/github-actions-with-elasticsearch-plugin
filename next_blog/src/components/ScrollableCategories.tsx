import Link from "next/link";
import { categories } from "@src/foundations/categories";
  
export const ScrollableCategories: React.FC = () => {
  return (
    <div className="scrollable-categories">
      {categories.map((category, i) => (
        <Link
          key={`category-${i}`}
          href={`categories/${category.name}`}
          passHref
        >
          <a className="scrollable-category__link">
            <div className="scrollable-category__name">{category.name}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};