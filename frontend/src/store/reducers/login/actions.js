import userApi from '../../../api/userApi';
import SET_MODAL from './constants';
import { setUser } from "../user/actions";
import { setServerErrors } from "../register/actions";
import { setProductsInCart } from "../cart/actions";

export const setLoginModal = (payload) => ({ type: SET_MODAL,payload });
export const loginUser = (data) => async (dispatch) => {
  try {
    const {
      user: { email, name, _id, type: userType },
      token,
      cart,
    } = await userApi.loginUser(data);
    localStorage.setItem('token', token);
    dispatch(setUser({ email, name, _id, userType }));
    dispatch(setProductsInCart(cart.products));
    dispatch(setServerErrors(null));
  } catch (e) {
    dispatch(setServerErrors(e));
  }
};
