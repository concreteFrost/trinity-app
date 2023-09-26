import * as DebugConsoleTypes from "../types/debugConsoleTypes";
import moment from "moment/moment";
const initialState = {
  successMessages: [],
  errorMessages: [],
};

export const debugConsoleReducer = (state = initialState, action) => {
  console.log("CONSOLE",state)
  switch (action.type) {
    case DebugConsoleTypes.ADD_SUCCESS_MESSAGE:
      return {...state, successMessages:[...state.successMessages, {id:state.successMessages.length, message: action.data, time : moment().format('HH:mm:ss')}]}
    case DebugConsoleTypes.ADD_ERROR_MESSAGE:
      return;
    case DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES:
      return {...state, successMessages:[]}
      return;
    case DebugConsoleTypes.CLEAR_ERROR_MESSAGES:
      return;
    case DebugConsoleTypes.CLEAR_ALL_MESSAGES:
      return;
    default:
      return state;
  }
};
