import { GET_HISTORY_AUDIT_TYPE_OPT,GET_HISTORY_AUDIT_LOCATIONS_OPT
,GET_HISTORY_AUDIT_STAFF_OPT,GET_HISTORY_AUDIT_USER_OPT,
SET_HISTORY_AUDIT_FROM_DATE,
SET_HISTORY_AUDIT_TO_DATE } from "../types";

const initialState = {
  options: {
    auditType: [],
    locations: [],
    staff: [],
    users: [],
  },
  dateFrom: new Date().toISOString().split("T")[0],
  dateTo: new Date().toISOString().split("T")[0],
};

export const searchHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_AUDIT_TYPE_OPT:
      return {
        ...state,
        options: { ...state.options, auditType: action.data },
      };
    case GET_HISTORY_AUDIT_LOCATIONS_OPT:
      return {
        ...state,
        options: { ...state.options, locations: action.data },
      };
    case GET_HISTORY_AUDIT_STAFF_OPT:
      return {
        ...state,
        options: { ...state.options, staff: action.data },
      };
    case GET_HISTORY_AUDIT_USER_OPT:
      return {
        ...state,
        options: { ...state.options, users: action.data },
      };
      case SET_HISTORY_AUDIT_FROM_DATE:
        return {
          ...state,
          dateFrom: action.data,
        };
      case SET_HISTORY_AUDIT_TO_DATE:
        return {
          ...state,
          dateTo: action.data,
        };
    default:
      return state;
  }
};
