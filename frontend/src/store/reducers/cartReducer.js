const initialState = {
    products: []
}

const SET_PRODUCTS = 'SET_PRODUCTS';

const cartReducer = (state=initialState,action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {...state,products:action.payload}
        default:
            return state
    }
}

export const setProductsInCart = (products) => ({ type: SET_PRODUCTS ,payload:products})

export default cartReducer