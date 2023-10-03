import * as DebugConsoleTypes from "../types/debugConsoleTypes";
import moment from "moment/moment";
const initialState = {
  successMessages: [],
  errorMessages: [],
  isConsoleVisible: false,
  currentComponent: 'all'
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
      return { ...state, successMessages: [...state.successMessages, { id: state.successMessages.length, message: action.message, response: response, request: request, component: action.component}] }
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
      return { ...state, errorMessages: [...state.errorMessages, { id: state.errorMessages.length, message: action.message, response: response, request: request, component:action.component }] }
    }
    case DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES:
      return { ...state, successMessages: [...state.successMessages.filter((message)=> message.component !== state.currentComponent)] }
    case DebugConsoleTypes.CLEAR_ERROR_MESSAGES:
      return { ...state, errorMessages: [...state.errorMessages.filter((message)=> message.component !== state.currentComponent)] }
    case DebugConsoleTypes.CLEAR_ALL_MESSAGES:
      return { ...state, successMessages: [], errorMessages: [] }
    case DebugConsoleTypes.TOGGLE_DEBUG_CONSOLE:
      return { ...state, isConsoleVisible: !state.isConsoleVisible }
    case DebugConsoleTypes.SET_CURRENT_COMPONENT:
      return{...state, currentComponent : action.data}
    default:
      return state;
  }
};
