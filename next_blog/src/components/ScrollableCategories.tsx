import styles from "@src/styles/components/ScrollableCategories.module.scss";
import Link from "next/link";
import { categories } from "@src/foundations/categories";
  
export const ScrollableCategories: React.FC = () => {
  return (
    <div className={styles.scrollableCategories}>
      {categories.map((category, i) => (
        <Link
          key={`category-${i}`}
          href={`categories/${category.name}`}
          passHref
        >
          <a className={styles.scrollableCategory__link}>
            <div className={styles.scrollableCategory__name}>{category.name}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};