import * as DebugConsoleTypes from "../types/debugConsoleTypes";

export function AddSuccessMessage(message){
    return {type: DebugConsoleTypes.ADD_SUCCESS_MESSAGE, data: message}
}

export function AddErrorMessage(message){
    return {type: DebugConsoleTypes.ADD_ERROR_MESSAGE, data: message}
    
}

export function ClearSuccessMessages(){
    return {type: DebugConsoleTypes.CLEAR_SUCCESS_MESSAGES}
}

export function ClearErrorMessages(){
    return {type: DebugConsoleTypes.CLEAR_ERROR_MESSAGES}
}

export function ClearAllMessages(){
    return {type:DebugConsoleTypes.CLEAR_ALL_MESSAGES}
}