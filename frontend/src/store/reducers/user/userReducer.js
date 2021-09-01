import { SET_AUTH_LOADING, SET_USER, UNSET_USER } from "./constants";

const initialState = {
  isLogged: false,
  email: null,
  name: null,
  _id: null,
  userType: null,
  isAuthLoading:false,
};



const userReducer = (state = initialState,action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, isLogged: true, ...action.payload };
      case UNSET_USER:
        return { ...state, isLogged: false, email: null, name: null, _id: null, userType: null };
      case SET_AUTH_LOADING:
        return {...state,isAuthLoading:action.payload}
      default:
        return state;
    }
}

export default userReducer