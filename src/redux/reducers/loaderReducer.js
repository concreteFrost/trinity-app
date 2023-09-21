import { SHOW_LOADER, HIDE_LOADER } from "../types";

const initialState = {
  isLoading: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default: return state;
  }
};
