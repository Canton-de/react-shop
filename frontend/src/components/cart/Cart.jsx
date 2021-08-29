/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import userApi from '../../api/userApi';
import CartItem from '../cart-item/CartItem';
import { setProductsInCart } from '../../store/reducers/cart/cartReducer';

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) history.push('/login');
    else {
      const loadProducts = async () => {
        const lproducts = await userApi.getProductsInCard();
        dispatch(setProductsInCart(lproducts));
      };
      loadProducts();
    }
  }, []);
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
        <div>
          Итого: {products.reduce((acc, product) => product.count + acc, 0)} товар(а) на сумму
          {products.reduce((acc, product) => product.count * product.price + acc, 0)}
        </div>
      )}
    </div>
  );
};

export default Cart;
