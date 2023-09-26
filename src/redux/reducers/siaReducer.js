import * as DoorstaffTypes from "../types/doorstaffTypes"

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

};

export const siaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DoorstaffTypes.SET_SIA_NUMBER:
      return {
        ...state, siaNumber: action.data
      }
    case DoorstaffTypes.GET_SIA_DATA:
      return {
        ...state,
        doorstaff: action.data,
      };
    case DoorstaffTypes.CLEAR_SIA_DATA:
      return initialState;
    case DoorstaffTypes.GET_DOORSTAFF_SUPPLIER_OPT:
      return {
        ...state,
        options: { ...state.options, suppliers: action.data }
      };
    case DoorstaffTypes.GET_DOORSTAFF_POSITION_OPT:
      return {
        ...state,
        options: { ...state.options, positions: action.data.sort((a, b) => a.positionName.localeCompare(b.positionName)) }
      };
    case DoorstaffTypes.GET_DOORSTAFF_RATE_OPT:
      return {
        ...state,
        options: { ...state.options, rates: action.data }
      };
    case DoorstaffTypes.SET_DOORSTAFF_SUPPLIER:
      return {
        ...state, supplier: action.data
      }
    case DoorstaffTypes.SET_DOORSTAFF_POSITION:
      return {
        ...state, position: action.data
      }
    case DoorstaffTypes.SET_DOORSTAFF_RATE:
      return {
        ...state, rate: action.data
      }
    case DoorstaffTypes.SET_DOORSTAFF_START_TIME:
      return {
        ...state, time: action.data
      }
    case DoorstaffTypes.SET_DOORSTAFF_START_DATE:
      return {
        ...state, date: action.data
      }

    default:
      return state;
  }
};
