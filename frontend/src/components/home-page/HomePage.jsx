import { Carousel } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shopApi from '../../api/shopApi';
import ProductItem from '../product-item/ProductItem';
import styles from './home-page.module.scss';
import Loader from '../loader/Loader';

const HomePage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  useEffect(() => {
    (async function l() {
      const curBestProducts = await shopApi.getBestProducts();
      setBestProducts(curBestProducts);
      setIsProductsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={styles['best-products']}>Лучшие продукты</div>
      {isProductsLoading ? (
        <Loader />
      ) : (
        <Carousel autoplay pauseOnHover={false} pauseOnDotsHover speed="800" autoplaySpeed={3000}>
          {bestProducts.map((el) => (
            <ProductItem product={el} />
          ))}
        </Carousel>
      )}
      <Link className={styles.categories} to="/categories">
        Категории
      </Link>
    </>
  );
};

export default HomePage;
