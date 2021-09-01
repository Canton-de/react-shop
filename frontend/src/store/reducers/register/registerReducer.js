import { SET_SERVER_ERRORS } from "./constants";

const initialState = {
    isRegistrating: false,
    serverErrors: null
}

const registerReducer = (state=initialState,action) => {
    switch (action.type) {
      case SET_SERVER_ERRORS:
        return { ...state, isRegistrating: false, serverErrors: action.payload };
      default:
        return state;
    }
}

export default registerReducer;