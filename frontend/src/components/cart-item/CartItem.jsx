/* eslint-disable no-underscore-dangle */
import { Card, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './cart-item.module.scss';
import cutString from '../../helpers/cutString';
import { setProductsInCart } from '../../store/reducers/cart/cartReducer';
import makeSeparatedPrice from '../../helpers/makeSeparatedPrice';
import cartApi from '../../api/cartApi';

const CartItem = ({ product }) => {
  const [cartFetching, setCartFetching] = useState(false);
  const dispatch = useDispatch();
  const addToCartHandler = async () => {
    setCartFetching(true);
    const newProducts = await cartApi.addToCart(product.product);
    dispatch(setProductsInCart(newProducts));
    return setCartFetching(false);
  };
  const removeFromCartHandler = async () => {
    setCartFetching(true);
    const newProducts = await cartApi.removeFromCart(product.product);
    dispatch(setProductsInCart(newProducts));
    setCartFetching(false);
  };
  return (
    <>
      <Card style={{ width: '70%', marginBottom: '10px' }}>
        <div className={styles.layoutItem}>
          <div style={{ width: 200 }}>
            <Carousel style={{ width: 200 }}>
              <div className={styles['slider-image']}>
                <img height="160px" src={`http://localhost:5000/images/${product.image}`} alt="product" />
              </div>
            </Carousel>
          </div>
          <div className={styles['product-info-wrapper']}>
            <Link to={`/product/${product.product}`}>
              <span className={styles.title}>{cutString(`${product.name}`, 60)}</span>
            </Link>
          </div>
          <div className={styles.count}>
            <div>{makeSeparatedPrice(product.price)} x</div>
            <button disabled={cartFetching} onClick={removeFromCartHandler} className={styles.minus} type="button">
              -
            </button>
            <div className={styles.counti}>{product.count}</div>
            <button disabled={cartFetching} onClick={addToCartHandler} className={styles.plus} type="button">
              +
            </button>
            =<div className={styles['full-price']}>{makeSeparatedPrice(product.count * product.price)} Р</div>
          </div>
          <div className={styles['buy-wrapper']}>
            <div className={styles['current-price']}>{makeSeparatedPrice(product.price)} Р</div>
          </div>
          <div className={styles['previous-price']}>
            {product.previousPrice ? `${makeSeparatedPrice(product.previousPrice)} Р` : null}
          </div>
        </div>
      </Card>
    </>
  );
};

export default CartItem;
