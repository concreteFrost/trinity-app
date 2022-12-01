import {
  GET_DOORSTAFF_LIST, GET_RECENT_DOORSTAFF,
  GET_DISPUTED_DOORSTAFF, SET_DOORSTAFF_ERROR_MESSAGE,
  CLEAR_DOORSTAFF_ERROR_MESSAGE
} from "../types";

const initialState = {
  current: [],
  recent: [],
  disputed: [],
  errorMessage: "",
};

export const doorstaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOORSTAFF_LIST:
      return {
        ...state,
        current: action.data,
      };
    case GET_RECENT_DOORSTAFF:
      return {
        ...state,
        recent: action.data,
      }
    case GET_DISPUTED_DOORSTAFF:
      return {
        ...state,
        disputed: action.data,
      }

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
