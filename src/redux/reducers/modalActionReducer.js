import * as ModalTypes from "../types/modalTypes";
const initialState = {
  isVisible: false,
  activityToModify: null,
  activityType: null,
  system: null
};

export const modalActionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ModalTypes.SHOW_ACTION_MODAL:
      return {
        ...state,
        isVisible: true,
        activityToModify: action.activityToModify,
        activityType: action.activityType,
        system: action.system
      };
    case ModalTypes.HIDE_ACTION_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};
