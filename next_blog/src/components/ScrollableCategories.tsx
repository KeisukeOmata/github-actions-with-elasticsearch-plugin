import Link from "next/link";
import { categories } from "@src/foundations/categories";
  
export const ScrollableCategories: React.FC = () => {
  return (
    <div className="scrollable-categories">
      {categories.map((category, i) => (
        <Link
          key={`scrollable-category-${i}`}
          href="https://github.com/KeisukeOmata"
          passHref
        >
          <div className="scrollable-category__link">
            <div className="scrollable-category__name">{category.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
