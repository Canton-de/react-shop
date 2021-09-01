import userApi from "../../../api/userApi";
import { setProductsInCart } from "../cart/cartReducer";
import { setUser } from "../user/actions";

const initialState = {
    isRegistrating: false,
    serverErrors: null
}

const USER_REGISTRATING = 'USER_REGISTRATING';
const SET_SERVER_ERRORS = 'SERVER_ERRORS';

const registerReducer = (state=initialState,action) => {
    switch (action.type) {
      case USER_REGISTRATING:
        return { ...state, isRegistrating: action.payload, serverErrors: null };
      case SET_SERVER_ERRORS:
        return { ...state, isRegistrating: false, serverErrors: action.payload };
      default:
        return state;
    }
}

export const userRegistrating = (isRegistrating) => ({ type:USER_REGISTRATING,payload:isRegistrating })
const setServerErrors = () => ({ type: SET_SERVER_ERRORS });

export const registerUser = data => async (dispatch) => {
    try{
        dispatch(userRegistrating(true));
        const {user:{email,name,_id,cart,type:userType},token} = await userApi.registerUser(data)
        localStorage.setItem('token',token)
        dispatch(setUser({ email, name, _id, userType }));
        dispatch(setProductsInCart(cart.products));
        dispatch(userRegistrating(false))
    }catch(e) {
        dispatch(setServerErrors())
    }

}
export default registerReducer;