import shopApi from '../../../api/shopApi';
import { POPULARITY_SORT, PRICE_SORT, SET_SHOP_PRODUCTS, SHOP_PRODUCTS_LOADING } from './constants';

const setShopProducts = (payload) => ({ type: SET_SHOP_PRODUCTS, payload });

const setShopProductsLoading = (payload) => ({type:SHOP_PRODUCTS_LOADING,payload})

export const loadProducts = (query, search) => async (dispatch) => {
  dispatch(setShopProductsLoading(true));
  const {products,count} = await shopApi.searchProducts(query, search);
  dispatch(setShopProductsLoading(false));
  dispatch(setShopProducts({products,count}));
};

export const sortPrice = () => ({ type: PRICE_SORT });
export const sortPopularity = () => ({ type: POPULARITY_SORT });
