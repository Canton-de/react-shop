/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userApi from '../../api/userApi';
import CartItem from '../cart-item/CartItem';
import { setProductsInCart } from '../../store/reducers/cartReducer';

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = async () => {
      const lproducts = await userApi.getProductsInCard();
      console.log(lproducts);
      dispatch(setProductsInCart(lproducts));
    };
    loadProducts();
  }, []);
  if (!products) return null;
  return (
    <div className="site-layout-content">
      {products.map((product) => (
        <div>
          <CartItem product={product} />
        </div>
      ))}
      <div>
        Итого: {products.reduce((acc, product) => product.count + acc, 0)} товар(а) на сумму
        {products.reduce((acc, product) => product.count * product.price + acc, 0)}
      </div>
    </div>
  );
};

export default Cart;
