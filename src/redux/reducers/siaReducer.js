import {
  GET_SIA_DATA, SET_SIA_NUMBER,
  SET_SIA_ERROR_MESSAGE, CLEAR_SIA_ERROR_MESSAGE,
  CLEAR_SIA_DATA
} from "../types";

const initialState = {
  siaNumber: null,
  doorstaff: {},
  options: {
    suppliers: [],
    positions: [],
    rates: []
  },
  supplier: null,
  position: null,
  rate: null,
  date: new Date().toISOString().split("T")[0],
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),

  errorMessage: "",
};

export const siaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIA_NUMBER:
      return {
        ...state, siaNumber: action.data
      }
    case GET_SIA_DATA:
      return {
        ...state,
        doorstaff: action.data,
      };
    case CLEAR_SIA_DATA:
      return {
        ...initialState
      };
    case "GET_DOORSTAFF_SUPPLIER_OPT":
      return {
        ...state,
        options: { ...state.options, suppliers: action.data }
      };
    case "GET_DOORSTAFF_POSITION_OPT":
      return {
        ...state,
        options: { ...state.options, positions: action.data }
      };
    case "GET_DOORSTAFF_RATE_OPT":
      return {
        ...state,
        options: { ...state.options, rates: action.data }
      };
    case "SET_DOORSTAFF_SUPPLIER":
      return {
        ...state, supplier: action.data
      }
    case "SET_DOORSTAFF_POSITION":
      return {
        ...state, position: action.data
      }
    case "SET_DOORSTAFF_RATE":
      return {
        ...state, rate: action.data
      }
    case "SET_DOORSTAFF_START_TIME":
      return {
        ...state, time: action.data
      }
    case "SET_DOORSTAFF_START_DATE":
      return {
        ...state, date: action.data
      }

    case SET_SIA_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data,
      };
    case CLEAR_SIA_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };

    default:
      return state;
  }
};
