/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CartItem from '../cart-item/CartItem';
import { setProductsInCart } from '../../store/reducers/cart/cartReducer';
import makeSeparatedPrice from '../../helpers/makeSeparatedPrice';
import styles from './cart.module.scss';
import cartApi from '../../api/cartApi';
import getTokenClient from '../../helpers/getTokenClient';

const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!getTokenClient()) history.push('/');
    else {
      const loadProducts = async () => {
        const lproducts = await cartApi.getProductsInCard();
        dispatch(setProductsInCart(lproducts));
      };
      loadProducts();
    }
  }, [getTokenClient()]);
  if (!products) return null;
  return (
    <div className="site-layout-content">
      {products.map((product) => (
        <div>
          <CartItem product={product} />
        </div>
      ))}
      {!products.length ? (
        <div>Ваша корзина пуста</div>
      ) : (
        <>
          <div className={styles['final-price']}>
            Итого: {products.reduce((acc, product) => product.count + acc, 0)}{' '}
            {declOfNum(
              products.reduce((acc, product) => product.count + acc, 0),
              ['товар', 'товара', 'товаров']
            )}{' '}
            на сумму
            {` ${makeSeparatedPrice(products.reduce((acc, product) => product.count * product.price + acc, 0))} Р.`}
          </div>
          <div className={styles.discount}>
            {`Скидка:
            ${products.reduce((acc, product) => {
              if (product.previousPrice) return acc + product.count * (product.previousPrice - product.price);
              return acc;
            }, 0)}
            Р`}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
