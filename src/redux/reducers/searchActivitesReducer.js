import {
  GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
  GET_ACTIVITIES_SEARCH_STAFF_OPT,
GET_SEARCHED_ACTIVITES,
  SET_ACTIVITIES_SEARCH_FROM_DATE,
  SET_ACTIVITIES_SEARCH_TO_DATE,
} from "../types/searchTypes";

const initialState = {
  options: {
    staff: [],
    suppliers: [],
    locations: [],
    locationsGroup: [],
    paymentStatus: [],
    paymentStatusGroup: [],
  },

  searchedActivities: [],
  searchedCentralCosts: [],

  dateFrom: new Date().toISOString().split("T")[0],
  dateTo: new Date().toISOString().split("T")[0],
};

export const searchActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT:
      return {
        ...state,
        options: { ...state.options, suppliers: action.data },
      };
    case GET_ACTIVITIES_SEARCH_LOCATIONS_OPT:
      return {
        ...state,
        options: { ...state.options, locations: action.data },
      };
    case GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT:
      return {
        ...state,
        options: { ...state.options, locationsGroup: action.data },
      };
    case GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT:
      return {
        ...state,
        options: { ...state.options, paymentStatus: action.data },
      };
    case GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT:
      return {
        ...state,
        options: { ...state.options, paymentStatusGroup: action.data },
      };
    case GET_ACTIVITIES_SEARCH_STAFF_OPT:
      return {
        ...state,
        options: { ...state.options, staff: action.data },
      };

    case SET_ACTIVITIES_SEARCH_FROM_DATE:
      return {
        ...state,
        dateFrom: action.data,
      };
    case SET_ACTIVITIES_SEARCH_TO_DATE:
      return {
        ...state,
        dateTo: action.data,
      };
    case GET_SEARCHED_ACTIVITES:
      return {
        ...state,
        searchedActivities: action.data,
      };

    case "GET_SEARCHED_COSTS":
      return {
        ...state,
        searchedCentralCosts: action.data,
      };

    default:
      return state;
  }
};
