import userApi from '../../../api/userApi';
import { POPULARITY_SORT, PRICE_SORT, SET_SHOP_PRODUCTS, SHOP_PRODUCTS_LOADING } from './constants';

const setShopProducts = (products) => ({ type: SET_SHOP_PRODUCTS, payload: products });

const setShopProductsLoading = (payload) => ({type:SHOP_PRODUCTS_LOADING,payload})

export const loadProducts = (query, category) => async (dispatch) => {
  dispatch(setShopProductsLoading(true));
  const products = await userApi.searchProducts(query, category);
  dispatch(setShopProductsLoading(false));
  dispatch(setShopProducts(products));
};

export const sortPrice = () => ({ type: PRICE_SORT });
export const sortPopularity = () => ({ type: POPULARITY_SORT });