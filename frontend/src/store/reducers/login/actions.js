import userApi from '../../../api/userApi';
import SET_MODAL from './constants';
import { userRegistrating } from "../register/registerReducer";
import { setUser } from "../user/actions";
import { setProductsInCart } from "../cart/cartReducer";

const setLoginModal = (payload) => ({ type: SET_MODAL,payload });
export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(userRegistrating(true));
    const {
      user: { email, name, _id},
      token,cart
    } = await userApi.loginUser(data);
    localStorage.setItem('token', token);
    dispatch(setUser({ email, name, _id }));
    dispatch(setProductsInCart(cart.products));
    dispatch(userRegistrating(false));
  } catch (e) {
    console.log(e)
  }
};
export default setLoginModal