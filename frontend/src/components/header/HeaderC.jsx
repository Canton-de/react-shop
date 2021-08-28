import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

const { Header } = Layout;

const HeaderC = () => {
  const { isLogged, name } = useSelector((store) => store.user);
  const { products } = useSelector((store) => store.cart);
  return (
    <>
      <Header>
        <div className={styles['header-wrapper']}>
          <NavLink activeClassName={styles.active} to="/home" className={styles.logo}>
            SHOP
          </NavLink>
          {isLogged ? (
            <div className={styles['sign-in']}>{name}</div>
          ) : (
            <NavLink activeClassName={styles.active} to="/sign-in" className={styles['sign-in']}>
              Sign in
            </NavLink>
          )}
          <NavLink activeClassName={styles.active} to="/cart" className={styles.cart}>
            Cart
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '-15px',
              }}
            >
              {products.reduce((acc, product) => product.count + acc, 0)}
            </div>
          </NavLink>
        </div>
      </Header>
    </>
  );
};

export default HeaderC;
