/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { Button, Input, Spin, Pagination } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { SyncOutlined } from '@ant-design/icons';
import ProductItem from '../product-item/ProductItem';
import { filterPrice, loadProducts, sortPopularity, sortPrice } from '../../store/reducers/products/actions';
import styles from './product-list.module.scss';

import changeQuery from '../../helpers/changeQuery';

const { Search } = Input;

const antIcon = <SyncOutlined style={{ fontSize: 60 }} spin />;

const ProductList = () => {
  const { products, sort, isLoading, count } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const query = useLocation();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const [minPriceFilter, setMinPriceFilter] = useState(Math.min(...products.map((product) => product.price)));
  const [maxPriceFilter, setMaxPriceFilter] = useState(Math.max(...products.map((product) => product.price)));
  useEffect(() => {
    const { search } = query;
    dispatch(loadProducts(category, search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = (q) => {
    history.push(`${query.pathname}${changeQuery('q', q, query.search.slice(1).split('&'))}`.replace(/page=\w+&?/, ''));
  };
  const handlePriceChange = () => {
    history.push(
      `${query.pathname}${changeQuery(
        'price',
        `${minPriceFilter}-${maxPriceFilter}`,
        query.search.slice(1).split('&')
      )}`
    );
  };
  const sortHandler = (sortType) => {
    if (sortType === 'price') return dispatch(sortPrice());
    return dispatch(sortPopularity());
  };
  const pageChangeHandler = (paginationPage) => {
    history.push(`${query.pathname}${changeQuery('page', paginationPage, query.search.slice(1).split('&'))}`);
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
      <div className={styles['main-content']}>
        <>
          <div className={styles['left-side']}>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <div>Цена</div>
            <div className={styles['price-filter']}>
              <Input
                prefix="от"
                onChange={(e) => setMinPriceFilter(e.target.value)}
                value={minPriceFilter}
                style={{ width: '48%' }}
                className={styles['price-input']}
                type="number"
              />
              <Input
                prefix="до"
                onChange={(e) => setMaxPriceFilter(e.target.value)}
                value={maxPriceFilter}
                style={{ width: '48%' }}
                className={styles['price-input']}
                type="number"
              />
            </div>
            <Button onClick={handlePriceChange} className={styles['price-button']}>
              Показать
            </Button>
          </div>
          {isLoading ? (
            <Spin indicator={antIcon} className={styles.spin} />
          ) : !products.length ? (
            <div>Товаров по заданнаму запросу не найдено</div>
          ) : (
            <div className={styles['right-side']}>
              {products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          )}
        </>
      </div>
      <Pagination current={query} onChange={pageChangeHandler} total={count} defaultPageSize="7" />
    </div>
  );
};

export default ProductList;
