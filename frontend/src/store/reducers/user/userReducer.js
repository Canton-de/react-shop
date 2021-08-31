import { SET_USER, UNSET_USER } from "./constants";

const initialState = {
    isLogged: false,
    email: null,
    name: null,
    id: null,
    type:null   
}



const userReducer = (state = initialState,action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, isLogged: true, ...action.payload };
      case UNSET_USER:
        return {...state,isLogged:false,email:null,name:null,id:null}
      default:
        return state;
    }
}

export default userReducer