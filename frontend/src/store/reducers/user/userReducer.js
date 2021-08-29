const initialState = {
    isLogged: false,
    email: null,
    name: null,
    id: null
}

const SET_USER = 'SET_USER' 
const UNSET_USER = 'UNSET_USER'; 

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

export const setUser = (data) => ({
    type: SET_USER,
    payload:data
})
export const unsetUser = () => ({
  type: UNSET_USER,
});


export default userReducer