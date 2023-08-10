
const initialState = {
  isVisible: false,
  activityToCancel: null
};

export const modalCancelReducer = (state = initialState, action) => {
  switch (action.type) {
    case  "SHOW_CANCEL_MODAL":
      return {
        ...state,
        isVisible: true,
        activityToCancel : action.data
      };
    case "HIDE_CANCEL_MODAL":
      return {
        ...state,
        isVisible: false,
      };    
    default:
      return state;
  }
};
