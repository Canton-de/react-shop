import { Button, Input, Pagination, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import ProductItem from '../product-item/ProductItem';
import { loadProducts } from '../../store/reducers/products/actions';
import styles from './product-list.module.scss';

import changeQuery from '../../helpers/changeQuery';
import returnExactQuery from '../../helpers/returnExactQuery';
import Loader from '../loader/Loader';

const { Search } = Input;

const ProductList = () => {
  const { products, isLoading, count } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const query = useLocation();
  const curSort = returnExactQuery(query.search, 'sort')?.[1];
  const curQ = returnExactQuery(query.search, 'q');
  const priceFilterFromQ = returnExactQuery(query.search, 'price')?.[1];
  const curPageFromQ = returnExactQuery(query.search, 'page')?.[1];
  const [value, setValue] = useState('');
  const history = useHistory();
  const { category } = useParams();
  const [minPriceFilter, setMinPriceFilter] = useState(priceFilterFromQ && priceFilterFromQ?.split('-')[0]);
  const [maxPriceFilter, setMaxPriceFilter] = useState(priceFilterFromQ && priceFilterFromQ?.split('-')[1]);
  useEffect(() => {
    const { search } = query;
    dispatch(loadProducts(category || 'search', search));
    setValue(curQ?.[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = (q) => {
    history.push(`${changeQuery('q', q, query.search.slice(1).split('&'))}`.replace(/page=\w+&?/, ''));
  };
  const handlePriceChange = () => {
    history.push(
      `${query.pathname}${changeQuery(
        'price',
        `${minPriceFilter || 0}-${maxPriceFilter || 1000}`,
        query.search.slice(1).split('&')
      )}`
    );
  };
  const sortHandler = (sortType) => {
    history.push(`${changeQuery('sort', sortType, query.search.slice(1).split('&'))}`);
  };
  const pageChangeHandler = (paginationPage) => {
    history.push(`${changeQuery('page', paginationPage, query.search.slice(1).split('&'))}`);
  };
  return (
    <div className="site-layout-content">
      {!isLoading && (
        <>
          <div className={styles['sort-buttons']}>
            <button
              className={styles['sort-button']}
              onClick={() => sortHandler(curSort === 'price-y' ? 'price-n' : 'price-y')}
              type="button"
            >
              price {curSort === 'price-y' ? <span>&uarr;</span> : curSort === 'price-n' ? <span> &darr;</span> : null}
            </button>
            <button
              className={styles['sort-button']}
              onClick={() => sortHandler(curSort === 'rating-n' ? 'rating-y' : 'rating-n')}
              type="button"
            >
              rating{' '}
              {curSort === 'rating-y' ? <span>&uarr;</span> : curSort === 'rating-n' ? <span> &darr;</span> : null}
            </button>
          </div>
        </>
      )}
      <div className={styles['main-content']}>
        <>
          <div className={styles['left-side']}>
            {query.pathname.slice(1) !== 'search' && (
              <Search
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Поиск по категории"
                onSearch={onSearch}
                enterButton
              />
            )}
            <div>Цена</div>
            <div className={styles['price-filter']}>
              <InputNumber
                prefix="от"
                onChange={(v) => setMinPriceFilter(v)}
                defaultValue={minPriceFilter || 0}
                style={{ width: '48%' }}
                type="number"
              />
              <InputNumber
                prefix="до"
                onChange={(v) => setMaxPriceFilter(v)}
                value={maxPriceFilter || 1000}
                style={{ width: '48%' }}
                type="number"
              />
            </div>
            <Button onClick={handlePriceChange} className={styles['price-button']}>
              Показать
            </Button>
          </div>
          {isLoading ? (
            <Loader />
          ) : !products.length ? (
            <div>Товаров по заданнаму запросу не найдено</div>
          ) : (
            <div className={styles['right-side']}>
              {products.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          )}
        </>
      </div>
      {!!count && (
        <Pagination
          style={{ textAlign: 'center' }}
          current={+curPageFromQ || 1}
          onChange={pageChangeHandler}
          total={count}
          defaultPageSize="7"
        />
      )}
    </div>
  );
};

export default ProductList;
