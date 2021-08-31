import SET_MODAL from './constants';

const initialState = {
  isModalOpen: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
