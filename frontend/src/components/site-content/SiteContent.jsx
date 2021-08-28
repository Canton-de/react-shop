import { Breadcrumb, Layout } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Product from '../product/Product';
import ProductList from '../product-list/ProductList';
import LoginPage from '../login-page/LoginPage';
import Cart from '../cart/Cart';
import Categories from '../categories/Categories';

const { Content } = Layout;
const SiteContent = () => (
  <Content style={{ minHeight: 'calc(100vh - 134px)' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>222</Breadcrumb.Item>
    </Breadcrumb>
    <Switch>
      <Route path="/home" component={Categories} />
      <Route path="/" exact component={Categories} />
      <Route path="/product/:id" component={Product} />
      <Route path="/categories/:category" component={ProductList} />
      <Route path="/sign-in" component={LoginPage} />
      <Route path="/cart" component={Cart} />
      return <div>123</div>
    </Switch>
  </Content>
);

export default SiteContent;
