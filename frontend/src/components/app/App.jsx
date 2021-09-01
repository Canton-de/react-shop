import { Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SiteContent from '../site-content/SiteContent';
import HeaderC from '../header/HeaderC';
import { authUser } from '../../store/reducers/user/actions';

const { Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);
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
