/* eslint-disable no-nested-ternary */
import { Input, Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { SyncOutlined } from '@ant-design/icons';
import ProductItem from '../product-item/ProductItem';
import { loadProducts, sortPopularity, sortPrice } from '../../store/reducers/products/actions';
import styles from './product-list.module.scss';
import debounce from '../../helpers/debounse';

const antIcon = <SyncOutlined style={{ fontSize: 60 }} spin />;

const HomePage = () => {
  const { products, sort, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(loadProducts(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (q) => {
      const { value } = q.target;
      if (!value) return dispatch(loadProducts());
      return dispatch(loadProducts(category, value));
    }, 1000),
    []
  );
  const sortHandler = (sortType) => {
    if (sortType === 'price') return dispatch(sortPrice());
    return dispatch(sortPopularity());
  };
  return (
    <div className="site-layout-content">
      {!isLoading && (
        <>
          <div className={styles['sort-buttons']}>
            <button className={styles['sort-button']} onClick={() => sortHandler('price')} type="button">
              price {sort === 'price' ? <span>&uarr;</span> : sort === 'price_reverse' ? <span> &darr;</span> : null}
            </button>
            <button className={styles['sort-button']} onClick={() => sortHandler('popularity')} type="button">
              popularity{' '}
              {sort === 'popularity' ? (
                <span>&uarr;</span>
              ) : sort === 'popularity_reverse' ? (
                <span> &darr;</span>
              ) : null}
            </button>
          </div>
        </>
      )}
      <Input onChange={search} />
      {isLoading ? (
        <Spin indicator={antIcon} className={styles.spin} />
      ) : !products.length ? (
        <div>Товаров по заданнаму запросу не найдено</div>
      ) : (
        products.map((product) => <ProductItem product={product} key={product.id} />)
      )}
    </div>
  );
};

export default HomePage;
