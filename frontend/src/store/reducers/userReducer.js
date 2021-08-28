const initialState = {
    isLogged: false,
    email: null,
    name: null,
    id: null
}

const SET_USER = 'SET_USER' 

const userReducer = (state = initialState,action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, isLogged: true, ...action.payload };
      default:
        return state;
    }
}

export const setUser = (data) => ({
    type: SET_USER,
    payload:data
})


export default userReducer