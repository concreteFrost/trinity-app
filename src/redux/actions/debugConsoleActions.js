import * as DebugConsoleTypes from "../types/debugConsoleTypes";

export function GetResponse(message, response) {
    return {
        type: DebugConsoleTypes.GET_RESPONSE,
        message: message,
        method: response.config.method,
        status: response.status,
        responseMessage: response.data.message,
        requestUrl: response.config.url.split("/api")[1],
        requestData: response.config.data !== undefined ? JSON.parse(response.config.data) : null
    }
}



export function AddErrorMessage(message) {
    return { type: DebugConsoleTypes.ADD_ERROR_MESSAGE, data: message }

}

export function ClearSuccessMessages() {
    return { type: DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES }
}

export function ClearErrorMessages() {
    return { type: DebugConsoleTypes.CLEAR_ERROR_MESSAGES }
}

export function ClearAllMessages() {
    return { type: DebugConsoleTypes.CLEAR_ALL_MESSAGES }
}