import userApi from "../../api/userApi";
import { setUser } from './userReducer';
import { setProductsInCart } from './cartReducer';

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

const userRegistrating = (isRegistrating) => ({ type:USER_REGISTRATING,payload:isRegistrating })
const setServerErrors = () => ({ type: SET_SERVER_ERRORS });

export const registerUser = data => async (dispatch) => {
    try{
        dispatch(userRegistrating(true));
        const {user:{email,name,_id,products},token} = await userApi.registerUser(data)
        localStorage.setItem('token',token)
        dispatch(setUser({email,name,_id}))
        dispatch(setProductsInCart(products));
        dispatch(userRegistrating(false))
    }catch(e) {
        dispatch(setServerErrors())
    }

}
export default registerReducer;