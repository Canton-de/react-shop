/* eslint-disable no-nested-ternary */
import { Input } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ProductItem from '../product-item/ProductItem';
import { loadProducts, loadProductsByQuery, sortPopularity, sortPrice } from '../../store/reducers/productsReducer';
import styles from './product-list.module.scss';

const HomePage = () => {
  const { products, sort } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(loadProducts(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const search = async (q) => {
    const { value } = q.target;
    if (!value) return dispatch(loadProducts());
    return dispatch(loadProductsByQuery(value, category));
  };
  const sortHandler = (sortType) => {
    if (sortType === 'price') return dispatch(sortPrice());
    return dispatch(sortPopularity());
  };
  return (
    <div className="site-layout-content">
      <div className={styles['sort-buttons']}>
        <button className={styles['sort-button']} onClick={() => sortHandler('price')} type="button">
          price {sort === 'price' ? <span>&uarr;</span> : sort === 'price_reverse' ? <span> &darr;</span> : null}
        </button>
        <button className={styles['sort-button']} onClick={() => sortHandler('popularity')} type="button">
          popularity{' '}
          {sort === 'popularity' ? <span>&uarr;</span> : sort === 'popularity_reverse' ? <span> &darr;</span> : null}
        </button>
      </div>
      <Input onChange={search} />
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default HomePage;
