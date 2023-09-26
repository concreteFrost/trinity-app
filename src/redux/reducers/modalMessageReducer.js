import {  SET_DISPUTED_CC_COUNT_MODAL, SET_DISPUTED_SIA_COUNT_MODAL } from "../types/authoriseTypes";
import * as ModalTypes from "../types/modalTypes";

const initialState = {
  showModal: false,
  header:"",
  message: "",
  DisputedSIA: 0,
  DisputedСС: 0,
};

export const modalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ModalTypes.SHOW_MODAL_MESSAGE:
      return {
        ...state,
        showModal: true,
        message: action.data,
      };
    case ModalTypes.HIDE_MODAL_MESSAGE: {
      localStorage.setItem("activityShown", true);
      return  {...initialState};
    }
    case ModalTypes.SET_MODAL_MESSAGE_HEADER: {
     
      return { ...state, showModal: false, header: action.data};
      
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
