import * as DebugConsoleTypes from "../types/debugConsoleTypes";
import moment from "moment/moment";
const initialState = {
  requests: [],
  successMessages: [],
  errorMessages: [],
};

export const debugConsoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case DebugConsoleTypes.GET_RESPONSE:
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
    case DebugConsoleTypes.ADD_ERROR_MESSAGE:
      return;
    case DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES:
      return { ...state, successMessages: [] }
      return;
    case DebugConsoleTypes.CLEAR_ERROR_MESSAGES:
      return;
    case DebugConsoleTypes.CLEAR_ALL_MESSAGES:
      return;
    default:
      return state;
  }
};
