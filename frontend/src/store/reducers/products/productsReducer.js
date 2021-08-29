import { POPULARITY_SORT, PRICE_SORT, SET_SHOP_PRODUCTS, SHOP_PRODUCTS_LOADING } from "./constants";

const initialState = {
    products: [],
    sort: null,
    isLoading:true,
}

const productsReducer = (state=initialState,action) => {
    switch (action.type) {
        case PRICE_SORT:{
            if(state.sort === 'price') {
                const clone = JSON.parse(JSON.stringify(state.products))
                return { ...state, products: clone.sort((a, b) => b.price - a.price), sort: 'price_reverse' };
            }
            const clone = JSON.parse(JSON.stringify(state.products))
                return { ...state, products: clone.sort((a, b) => a.price - b.price), sort: 'price' };
        }
        case POPULARITY_SORT:{
            if (state.sort === 'popularity') {
              const clone = JSON.parse(JSON.stringify(state.products));
              return { ...state, products: clone.sort((a, b) => b.rates.length - a.rates.length),sort:'popularity_reverse' };
            }
            const clone = JSON.parse(JSON.stringify(state.products));
            return { ...state, products: clone.sort((a, b) => a.rates.length - b.rates.length), sort: 'popularity' };
        }
        case SET_SHOP_PRODUCTS:
            return {...state,products:action.payload,sort:null}
        case SHOP_PRODUCTS_LOADING:
            return {...state,isLoading:action.payload}
        default:
            return state
    }
}

export default productsReducer