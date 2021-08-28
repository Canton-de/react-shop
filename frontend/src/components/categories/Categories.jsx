import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './categories.module.scss';

const serverCategories = ['electronic', 'qwe'];

const Categories = () => {
  const [categories, setCategories] = useState(serverCategories);
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <Link to={`/categories/${category}`} className={styles.category}>
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
