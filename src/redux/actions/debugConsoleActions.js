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

export function GetBadResponse(message, res, component) {
  const config = res.config;
  console.log("res is ", res);

  let responseMessage = res.response.data;

  if (typeof responseMessage === "object") {
    responseMessage = res.response.data.error;
  }

  return {
    type: DebugConsoleTypes.GET_BAD_RESPONSE,
    message: message,
    responseMessage: responseMessage,
    status: res.response.status,
    method: config.method,
    requestData: config.data ? config.data : "null",
    requestUrl: config.url.split("/api")[1],
    component: component,
  };
}

export function DeleteErrorMessage(id) {
  return { type: DebugConsoleTypes.DELETE_ERROR_MESSAGE, data: id };
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
