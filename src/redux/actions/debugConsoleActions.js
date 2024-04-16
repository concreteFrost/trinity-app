import * as DebugConsoleTypes from "../types/debugConsoleTypes";

export function GetResponse(message, response, component) {
  return {
    type: DebugConsoleTypes.GET_RESPONSE,
    message: message,
    method: response.config.method,
    status: response.status,
    responseMessage: response.data.message ? response.data.message : "null",
    requestUrl: response.config.url.split("/api")[1],
    requestData:
      response.config.data !== undefined
        ? JSON.parse(response.config.data)
        : null,
    component: component,
  };
}

export function GetBadResponse(message, response, component) {
  return {
    type: DebugConsoleTypes.GET_BAD_RESPONSE,
    message: message,
    responseMessage: response.response.data.error
      ? response.response.data.error
      : response.message,
    status: response.response.status,
    method: response.config.method,
    requestData: response.config.data ? response.config.data : "null",
    requestUrl: response.config.url.split("/api")[1],
    component: component,
  };
}

export function SetCurrentComponent(component) {
  return { type: DebugConsoleTypes.SET_CURRENT_COMPONENT, data: component };
}

export function ClearSuccessMessages() {
  return { type: DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES };
}

export function ClearErrorMessages() {
  return { type: DebugConsoleTypes.CLEAR_ERROR_MESSAGES };
}

export function ClearAllMessages() {
  return { type: DebugConsoleTypes.CLEAR_ALL_MESSAGES };
}

export function ToggleDebugConsole() {
  return { type: DebugConsoleTypes.TOGGLE_DEBUG_CONSOLE };
}
