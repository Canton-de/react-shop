import { Layout, Input, Popover } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import LoginModal from '../login-modal/LoginModal';
import styles from './header.module.scss';
import returnExactQuery from '../../helpers/returnExactQuery';
import { setLoginModal } from '../../store/reducers/login/actions';
import { unsetUser } from '../../store/reducers/user/actions';
import deleteAuthFromClient from '../../helpers/deleteAuthFromClient';
import getTokenClient from '../../helpers/getTokenClient';
import { unsetProductsInCart } from '../../store/reducers/cart/actions';

const { Header } = Layout;

const HeaderC = () => {
  const { isLogged, name, userType } = useSelector((store) => store.user);
  const { isModalOpen } = useSelector((store) => store.login);
  const { products } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const logOutRef = useRef();
  const userRef = useRef();
  const query = useLocation();
  const history = useHistory();
  const [value, setValue] = useState('');
  const logOutHandler = () => {
    deleteAuthFromClient();
    dispatch(unsetUser());
    dispatch(unsetProductsInCart());
  };
  const onSearch = () => {
    history.push(`/search?q=${value}`);
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (userRef.current) {
      const windowCloseLogOut = (e) => {
        if (!userRef.current?.contains(e.target) && userRef.current) logOutRef.current.classList.add(styles.hidden);
      };
      window.addEventListener('click', windowCloseLogOut);
      return () => {
        window.removeEventListener('click', windowCloseLogOut);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRef.current]);

  useEffect(() => {
    if (query.pathname.slice(1) === 'search') setValue(returnExactQuery(query.search, 'q')?.[1]);
  }, [query.search, query.pathname]);
  return (
    <>
      <Header className={styles.header}>
        <div className={styles['header-wrapper']}>
          <NavLink activeClassName={styles.active} to="/" className={styles.logo}>
            SHOP
          </NavLink>
          <Input
            placeholder="Поиск по сайту"
            onChange={(e) => setValue(e.target.value)}
            className={styles.search}
            onPressEnter={onSearch}
            value={value}
          />
          {userType === 'admin' ? (
            <NavLink to="/admin" className={styles.admin}>
              admin
            </NavLink>
          ) : null}
          {isLogged ? (
            <>
              <Popover
                overlayInnerStyle={{ position: 'relative' }}
                placement="bottom"
                content={() => (
                  <button onClick={logOutHandler} type="button" ref={logOutRef} className={styles['log-out']}>
                    Log out
                  </button>
                )}
                trigger="click"
              >
                <button type="button" className={styles['sign-in']}>
                  {name}
                </button>
              </Popover>
            </>
          ) : (
            <button className={styles['sign-in']} type="button" onClick={() => dispatch(setLoginModal(true))}>
              Sign in
            </button>
          )}
          {getTokenClient() && (
            <NavLink activeClassName={styles.active} to="/cart" className={styles.cart}>
              Cart
              <span className={styles['cart-count']}>{products.reduce((acc, product) => product.count + acc, 0)}</span>
            </NavLink>
          )}
          <LoginModal handleCancel={() => dispatch(setLoginModal(false))} isOpen={isModalOpen} />
        </div>
      </Header>
    </>
  );
};

export default HeaderC;
