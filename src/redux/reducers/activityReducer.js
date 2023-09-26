import * as ActivityTypes from "../types/activityTypes";

const initialState = {
  GetOpt: {
    activityTypeOpt: [],
    supplierOpt: [],
  },

  getRate: {},

  activityType: null,
  supplierId: null,
  costValue: null,
  hoursWorked: null,
  supplierProvided: false
};

export const activityReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActivityTypes.GET_ACTIVITY_TYPE_OPT:
      return {
        ...state,
        GetOpt: { ...state.GetOpt, activityTypeOpt: action.data },
      };
    case ActivityTypes.GET_ACTIVITY_SUPPLIER_OPT:
      return {
        ...state,
        GetOpt: { ...state.GetOpt, supplierOpt: action.data },
      };

    case ActivityTypes.GET_ACTIVITY_RATE: {
      return {
        ...state,
        getRate: action.data,
      };
    }
    case ActivityTypes.SET_ACTIVITY_TYPE:
      return {
        ...state,
        activityType: action.data,
      };
    case ActivityTypes.SET_ACTIVITY_SUPPLIER:
      return {
        ...state,
        supplierId: action.data,
      };

    case ActivityTypes.SET_ACTIVITY_HOURS_WORKED: {
      return {
        ...state,
        hoursWorked: action.data,
      };
    }
    case ActivityTypes.SET_ACTIVITY_COST_VALUE: {
      return {
        ...state,
        costValue: action.data,
      };
    }
    case ActivityTypes.CLEAR_ACTIVITY: {
      return {
        ...initialState
      };
    }
    case ActivityTypes.SUPPLIER_PROVIDED: {
      return {
        ...state, supplierProvided: action.data
      }
    }
    default:
      return state;
  }
};
