/* eslint-disable no-underscore-dangle */
import { Card, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './cart-item.module.scss';
import cutString from '../../helpers/cutString';
import userApi from '../../api/userApi';
import { setProductsInCart } from '../../store/reducers/cartReducer';

const CartItem = ({ product }) => {
  function onChange(a, b, c) {
    return a + b + c;
  }
  const [cartFetching, setCartFetching] = useState(false);
  const dispatch = useDispatch();
  const addToCartHandler = async () => {
    setCartFetching(true);
    const newProducts = await userApi.addToCart(product.product);
    dispatch(setProductsInCart(newProducts));
    setCartFetching(false);
  };
  const removeFromCartHandler = async () => {
    setCartFetching(true);
    const newProducts = await userApi.removeFromCart(product.product);
    dispatch(setProductsInCart(newProducts));
    setCartFetching(false);
  };
  return (
    <>
      <Card style={{ width: '70%', marginBottom: '10px' }}>
        <div className={styles.layoutItem}>
          <div style={{ width: 200 }}>
            <Carousel afterChange={onChange} style={{ width: 200 }}>
              <div className={styles['slider-image']}>
                <img height="160px" src={`http://localhost:5000/images/${product.image}`} alt="product" />
              </div>
            </Carousel>
          </div>
          <div className={styles['product-info-wrapper']}>
            <Link to={`/product/${product._id}`}>
              <span className={styles.title}>{cutString(`${product.name}`, 60)}</span>
            </Link>
          </div>
          <div className={styles.count}>
            <div>{product.price} X </div>
            <button disabled={cartFetching} onClick={removeFromCartHandler} className={styles.minus} type="button">
              -
            </button>
            <div className={styles.counti}>{product.count}</div>
            <button disabled={cartFetching} onClick={addToCartHandler} className={styles.plus} type="button">
              +
            </button>
          </div>
          <div className={styles['buy-wrapper']}>
            <div className={styles['current-price']}>{product.count * product.price} Р</div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CartItem;
