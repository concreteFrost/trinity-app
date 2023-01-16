import { SHOW_LOGOUT_MODAL, HIDE_LOGOUT_MODAL } from "../types";

const initialState = {
  isVisible: false,

};

export const modalLogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGOUT_MODAL:
      return {
        ...state,
        isVisible: true,
      };
    case HIDE_LOGOUT_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    
    default:
      return state;
  }
};
