import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shopApi from '../../api/shopApi';
import styles from './categories.module.scss';
import Loader from '../loader/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    shopApi.getCategories().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className={styles.categories}>
      {isLoading ? (
        <Loader />
      ) : (
        categories.map((category) => (
          <Link to={`/categories/${category}`} className={styles.category}>
            {category}
          </Link>
        ))
      )}
    </div>
  );
};

export default Categories;
