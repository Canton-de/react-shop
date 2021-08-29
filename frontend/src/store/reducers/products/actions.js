import userApi from '../../../api/userApi';
import { POPULARITY_SORT, PRICE_FILTER, PRICE_SORT, SET_SHOP_PRODUCTS, SHOP_PRODUCTS_LOADING } from './constants';

const setShopProducts = (payload) => ({ type: SET_SHOP_PRODUCTS, payload });

const setShopProductsLoading = (payload) => ({type:SHOP_PRODUCTS_LOADING,payload})

export const loadProducts = (query, search) => async (dispatch) => {
  dispatch(setShopProductsLoading(true));
  const {products,count} = await userApi.searchProducts(query, search);
  dispatch(setShopProductsLoading(false));
  dispatch(setShopProducts({products,count}));
};

export const sortPrice = () => ({ type: PRICE_SORT });
export const sortPopularity = () => ({ type: POPULARITY_SORT });
export const filterPrice = (min, max) => ({ type: PRICE_FILTER, payload: { min, max } });