import { SET_SERVER_ERRORS } from "./constants";
import { setUser } from "../user/actions";
import { setProductsInCart } from "../cart/actions";
import userApi from '../../../api/userApi';

export const setServerErrors = (error) => ({ type: SET_SERVER_ERRORS,payload:error });

export const registerUser = (data) => async (dispatch) => {
  try {
    const {
      user: { email, name, _id, cart, type: userType },
      token,
    } = await userApi.registerUser(data);
    localStorage.setItem('token', token);
    dispatch(setUser({ email, name, _id, userType }));
    dispatch(setProductsInCart(cart.products));
    dispatch(setServerErrors(null));
  } catch (e) {
    dispatch(setServerErrors(e));
  }
};
