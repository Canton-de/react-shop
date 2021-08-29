import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import cartReducer from './reducers/cart/cartReducer';
import productsReducer from './reducers/products/productsReducer';
import registerReducer from './reducers/register/registerReducer';
import userReducer from './reducers/user/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootStore = combineReducers({
  user: userReducer,
  register: registerReducer,
  cart: cartReducer,
  products: productsReducer,
});
const store = createStore(rootStore, composeEnhancers(applyMiddleware(thunk)));

export default store