import * as DebugConsoleTypes from "../types/debugConsoleTypes";
import moment from "moment/moment";
const initialState = {
  successMessages: [],
  errorMessages: [],
  isConsoleVisible: false
};

export const debugConsoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case DebugConsoleTypes.GET_RESPONSE: {
      const response = {
        method: action.method,
        status: action.status,
        responseTime: moment().format('HH:mm:ss'),
        message: action.responseMessage
      }
      const request = {
        url: action.requestUrl,
        data: action.requestData
      }
      return { ...state, successMessages: [...state.successMessages, { id: state.successMessages.length, message: action.message, response: response, request: request, }] }
    }
    case DebugConsoleTypes.GET_BAD_RESPONSE: {
      const response = {
        method: action.method,
        status: action.status,
        responseTime: moment().format('HH:mm:ss'),
        message: action.responseMessage,
      }

      const request = {
        url: action.requestUrl,
        data: action.requestData
      }
      return { ...state, errorMessages: [...state.errorMessages, { id: state.errorMessages.length, message: action.message, response: response, request: request, }] }
    }

    case DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES:
      return { ...state, successMessages: [] }
    case DebugConsoleTypes.CLEAR_ERROR_MESSAGES:
      return { ...state, errorMessages: [] }
    case DebugConsoleTypes.CLEAR_ALL_MESSAGES:
      return { ...state, successMessages: [], errorMessages: [] }
    case DebugConsoleTypes.TOGGLE_DEBUG_CONSOLE:
      return { ...state, isConsoleVisible: !state.isConsoleVisible }
    default:
      return state;
  }
};
