import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import registerReducer from './reducers/registerReducer';
import userReducer from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootStore = combineReducers({
    user: userReducer,
    register: registerReducer,
    cart:cartReducer,
    products: productsReducer
})
const store = createStore(rootStore, composeEnhancers(applyMiddleware(thunk)));

export default store