import { SHOW_MODAL_MESSAGE, HIDE_MODAL_MESSAGE } from "../types";

const initialState = {
  showModal: false,
  message: "",
  DisputedSIA: 0,
  DisputedСС: 0,
};

export const modalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL_MESSAGE:
      return {
        ...state,
        showModal: true,
        message: action.data,
      };
    case HIDE_MODAL_MESSAGE: {
      return { ...state, showModal: false, message: "" };
    }
    case "SHOW_DISPUTED_SIA_MODAL":
      return {
        ...state,
        DisputedSIA: action.data,
      };
    case "SHOW_DISPUTED_CC_MODAL":
      return {
        ...state,
        DisputedCC: action.data,
      };

    default:
      return state;
  }
};
