import { Layout, Button } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { unsetProductsInCart } from '../../store/reducers/cart/cartReducer';
import { unsetUser } from '../../store/reducers/user/userReducer';
import LoginModal from '../login-modal/LoginModal';
import styles from './header.module.scss';

const { Header } = Layout;

const HeaderC = () => {
  const { isLogged, name } = useSelector((store) => store.user);
  const { products } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const logOutRef = useRef();
  const userRef = useRef();
  const logOutHandler = () => {
    localStorage.removeItem('token');
    dispatch(unsetUser());
    dispatch(unsetProductsInCart());
  };
  const [isModalOpen, setIsModalOpen] = useState();
  const logOutHideHandler = () => {
    const classes = logOutRef.current.classList;
    if (!classes.contains(styles.hidden)) classes.add(styles.hidden);
    else classes.remove(styles.hidden);
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
  const openLoginModal = () => {};
  return (
    <>
      <Header>
        <div className={styles['header-wrapper']}>
          <NavLink activeClassName={styles.active} to="/home" className={styles.logo}>
            SHOP
          </NavLink>
          {isLogged ? (
            <button
              ref={userRef}
              onClick={logOutHideHandler}
              type="button"
              className={`${styles['sign-in']} ${styles.user} ${styles['hide-log-out']}`}
            >
              {name}
              <button
                onClick={logOutHandler}
                type="button"
                ref={logOutRef}
                className={`${styles['log-out']} ${styles.hidden}`}
              >
                Log out
              </button>
            </button>
          ) : (
            <button className={styles['sign-in']} type="button" onClick={() => setIsModalOpen(true)}>
              Sign in
            </button>
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
          <LoginModal handleOpen={setIsModalOpen} isOpen={isModalOpen} />
        </div>
      </Header>
    </>
  );
};

export default HeaderC;
