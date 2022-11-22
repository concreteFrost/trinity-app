const initialState = {
  GetOpt: {
    activityTypeOpt: [],
    supplierOpt: [],
  },

  getRate: {},

  activityType: null,
  supplier: null,
  costValue: null,
  hoursWorked: null,


};

export const activityReducer = (state = initialState, action) => {

  switch (action.type) {
    case "GET_ACTIVITY_TYPE_OPT":
      return {
        ...state,
        GetOpt: { ...state.GetOpt, activityTypeOpt: action.data },
      };
    case "GET_SUPPLIER_OPT":
      return {
        ...state,
        GetOpt: { ...state.GetOpt, supplierOpt: action.data },
      };

      case "GET_RATE": {
        return {
          ...state,
          getRate: action.data,
        };}
    case "SET_ACTIVITY_TYPE":
      return {
        ...state,
        activityType: action.data,
      };
    case "SET_ACTIVITY_SUPPLIER":
      return {
        ...state,
        supplier: action.data,
      };

    case "SET_ACTIVITY_HOURS_WORKED": {
      return {
        ...state,
        hoursWorked: action.data,
      };
    }
    case "SET_ACTIVITY_COST_VALUE": {
      return {
        ...state,
        costValue: action.data,
      };
    }
    case "CLEAR_ACTIVITY": {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};
