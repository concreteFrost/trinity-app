import { SHOW_MODAL_MESSAGE, HIDE_MODAL_MESSAGE, SET_MODAL_MESSAGE_HEADER, SET_DISPUTED_CC_COUNT_MODAL, SET_DISPUTED_SIA_COUNT_MODAL } from "../types";

const initialState = {
  showModal: false,
  header:"",
  message: "",
  DisputedSIA: 0,
  DisputedСС: 0,
  currentSection:""
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
      return  {...initialState, currentSection: 'disputed'};
    }
    case SET_MODAL_MESSAGE_HEADER: {
      return { ...state, showModal: false, header: action.data };
    }
    case SET_DISPUTED_SIA_COUNT_MODAL:
      return {
        ...state,
        DisputedSIA: action.data,
    
      };
    case SET_DISPUTED_CC_COUNT_MODAL:
      return {
        ...state,
        DisputedCC: action.data,
    
      };

    default:
      return state;
  }
};
