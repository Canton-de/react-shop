import { Breadcrumb, Layout } from 'antd';
import { Route, Switch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Product from '../single-product/SingleProduct';
import ProductList from '../product-list/ProductList';
import LoginPage from '../login-page/LoginPage';
import Cart from '../cart/Cart';
import Categories from '../categories/Categories';
import WithBreadcrump from '../hocs/WithBreadcrump';

const { Content } = Layout;
const SiteContent = () => {
  const history = useLocation();
  const breadItems = history.pathname.slice(1).split('/');
  return (
    <Content style={{ minHeight: 'calc(100vh - 134px)' }}>
      <Switch>
        <Route path="/home" component={Categories} />
        <Route path="/" exact component={Categories} />
        <Route path="/product/:id" component={Product} />
        <Route path="/categories/:category" component={WithBreadcrump(ProductList, breadItems)} />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/cart" component={Cart} />
        return <div>Page Not Found</div>
      </Switch>
    </Content>
  );
};

export default SiteContent;
