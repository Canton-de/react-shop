import { SET_PRODUCTS_IN_CART, UNSET_PRODUCTS_IN_CART } from "./constants";

export const setProductsInCart = (products) => ({ type: SET_PRODUCTS_IN_CART, payload: products });
export const unsetProductsInCart = () => ({ type: UNSET_PRODUCTS_IN_CART });
