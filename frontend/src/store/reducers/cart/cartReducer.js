const initialState = {
    products: []
}

const SET_PRODUCTS_IN_CART = 'SET_PRODUCTS_IN_CART';
const UNSET_PRODUCTS_IN_CART = 'UNSET_PRODUCTS_IN_CART';

const cartReducer = (state=initialState,action) => {
    switch (action.type) {
      case SET_PRODUCTS_IN_CART:
        return { ...state, products: action.payload };
      case UNSET_PRODUCTS_IN_CART:
        return { ...state, products: [] };
      default:
        return state;
    }
}

export const setProductsInCart = (products) => ({ type: SET_PRODUCTS_IN_CART, payload: products });
export const unsetProductsInCart = () => ({ type: UNSET_PRODUCTS_IN_CART});

export default cartReducer