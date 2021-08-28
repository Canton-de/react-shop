/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SiteContent from '../site-content/SiteContent';
import HeaderC from '../header/HeaderC';
import userApi from '../../api/userApi';
import { setUser } from '../../store/reducers/userReducer';
import { setProductsInCart } from '../../store/reducers/cartReducer';

const { Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authUser = async () => {
      const { email, name, _id } = await userApi.authUser();
      dispatch(setUser({ email, name, _id }));
      const products = await userApi.getProductsInCard();
      dispatch(setProductsInCart(products));
    };
    authUser();
  }, []);
  return (
    <div className="app">
      <Layout className="layout">
        <HeaderC />
        <SiteContent />
        <Footer style={{ textAlign: 'center' }}>React shop ©2021</Footer>
      </Layout>
    </div>
  );
};
export default App;
