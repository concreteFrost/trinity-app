import * as DebugConsoleTypes from "../types/debugConsoleTypes";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  errorMessages: [],
  isConsoleVisible: false,
  currentComponent: "all",
};

const MAX_BADMESSAGES = 30;

export const debugConsoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case DebugConsoleTypes.GET_BAD_RESPONSE: {
      const response = {
        method: action.method,
        status: action.status,
        responseTime: moment().format("HH:mm:ss"),
        message: action.responseMessage,
      };
      const request = {
        url: action.requestUrl,
        data: action.requestData,
      };
      const newErrorMessages = [
        ...state.errorMessages,
        {
          id: uuidv4(),
          message: action.message,
          response: response,
          request: request,
          component: action.component,
        },
      ].slice(-MAX_BADMESSAGES); // Ограничиваем до последних 50 сообщений
      console.log(state.errorMessages);
      return { ...state, errorMessages: newErrorMessages };
    }

    case DebugConsoleTypes.DELETE_ERROR_MESSAGE: {
      const filtered = state.errorMessages.filter((x) => x.id !== action.data);
      return { ...state, errorMessages: filtered };
    }

    case DebugConsoleTypes.CLEAR_ALL_MESSAGES:
      return { ...state, errorMessages: [] };

    case DebugConsoleTypes.TOGGLE_DEBUG_CONSOLE:
      return { ...state, isConsoleVisible: !state.isConsoleVisible };

    case DebugConsoleTypes.SET_CURRENT_COMPONENT:
      return { ...state, currentComponent: action.data };

    default:
      return state;
  }
};
