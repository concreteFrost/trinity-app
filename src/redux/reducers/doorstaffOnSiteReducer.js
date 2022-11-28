import { GET_DOORSTAFF_LIST, SET_DOORSTAFF_ERROR_MESSAGE, CLEAR_DOORSTAFF_ERROR_MESSAGE } from "../types";

const initialState = {
  doorstaff: [],
  errorMessage: "",
};

export const doorstaffOnSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOORSTAFF_LIST:
      return {
        ...state,
        doorstaff: action.data,
      };
    case SET_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data,
      };
    case CLEAR_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};
