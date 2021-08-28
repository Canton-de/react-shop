import userApi from "../../api/userApi";

const initialState = {
    products: [],
    sort: null,
}

const PRICE_SORT = 'PRICE_SORT'
const POPULARITY_SORT = 'POPULARITY_SORT'
const SET_SHOP_PRODUCTS = 'SET_SHOP_PRODUCTS';

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
        default:
            return state
    }
}

const setShopProducts = products => ({type:SET_SHOP_PRODUCTS,payload:products})

export const loadProducts = (categorie) => async(dispatch) => {
    const products = await userApi.loadProducts(categorie)
    dispatch(setShopProducts(products))
}

export const loadProductsByQuery = (query,category) => async(dispatch) => {
    const products = await userApi.searchProducts(query, category);
    dispatch(setShopProducts(products))
}

export const sortPrice = () => ({type:PRICE_SORT})
export const sortPopularity = () => ({type:POPULARITY_SORT})

export default productsReducer