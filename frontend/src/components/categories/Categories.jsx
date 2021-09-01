import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shopApi from '../../api/shopApi';
import styles from './categories.module.scss';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    shopApi.getCategories().then((data) => setCategories(data));
  }, []);
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
