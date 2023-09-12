
const initialState = {
  isVisible: false,
  activityToModify: null,
  activityType : null
};

export const modalCancelReducer = (state = initialState, action) => {
  switch (action.type) {
    case  "SHOW_ACTION_MODAL":
      return {
        ...state,
        isVisible: true,
        activityToModify : action.activityToModify,
        activityType : action.activityType
      };
    case "HIDE_ACTION_MODAL":
      return {
        ...state,
        isVisible: false,
      };    
    default:
      return state;
  }
};
