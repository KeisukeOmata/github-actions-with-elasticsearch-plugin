import React from 'react'
import styles from 'styles/components/ScrollableCategories.module.scss'
import Link from 'next/link'
import { categories } from 'foundations/categories'

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
            <div className={styles.scrollableCategory__name}>
              {category.name}
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
