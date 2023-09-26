import * as ModalTypes from "../types/modalTypes"

const initialState = {
  isVisible: false,

};

export const modalLogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ModalTypes.SHOW_LOGOUT_MODAL:
      return {
        ...state,
        isVisible: true,
      };
    case ModalTypes.HIDE_LOGOUT_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    
    default:
      return state;
  }
};
