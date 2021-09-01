import cartApi from "../../../api/cartApi";
import userApi from "../../../api/userApi";
import { SET_AUTH_LOADING, SET_USER, UNSET_USER } from "./constants";
import { setProductsInCart } from "../cart/actions";

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});
export const unsetUser = () => ({
  type: UNSET_USER,
});
export const setAuthLoading = (isLoading) => ({
  type:SET_AUTH_LOADING,
  payload:isLoading
})
export const authUser = () => async(dispatch) => {
  const { email, name, _id, type: userType } = await userApi.authUser();
  dispatch(setUser({ email, name, _id, userType }));
  if (localStorage.getItem('token')) {
    const products = await cartApi.getProductsInCard();
    dispatch(setProductsInCart(products));
  }
};
authUser();
