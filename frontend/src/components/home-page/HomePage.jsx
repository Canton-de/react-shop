import { Button, Carousel } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shopApi from '../../api/shopApi';
import ProductItem from '../product-item/ProductItem';
import styles from './home-page.module.scss';

const contentStyle = {
  height: '50vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const HomePage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  useEffect(() => {
    (async function l() {
      const curBestProducts = await shopApi.getBestProducts();
      setBestProducts(curBestProducts);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>Лучшие продукты:</div>
      <Carousel autoplay pauseOnHover={false} pauseOnDotsHover speed="800" autoplaySpeed={2000}>
        {bestProducts.map((el) => (
          <ProductItem product={el} />
        ))}
      </Carousel>
      <Link to="/categories">Категории</Link>
    </>
  );
};

export default HomePage;
