import { SET_PRODUCTS_IN_CART, UNSET_PRODUCTS_IN_CART } from "./constants";

const initialState = {
    products: []
}

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

export default cartReducer