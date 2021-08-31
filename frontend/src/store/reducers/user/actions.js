import cartApi from "../../../api/cartApi";
import userApi from "../../../api/userApi";
import { setProductsInCart } from "../cart/cartReducer";
import { SET_USER, UNSET_USER } from "./constants";

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});
export const unsetUser = () => ({
  type: UNSET_USER,
});
export const authUser = () => async(dispatch) => {
  const { email, name, _id } = await userApi.authUser();
  dispatch(setUser({ email, name, _id }));
  if (localStorage.getItem('token')) {
    const products = await cartApi.getProductsInCard();
    dispatch(setProductsInCart(products));
  }
};
authUser();
