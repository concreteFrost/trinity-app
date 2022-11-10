
export function SetLoginDetails(data) {
    return {type: "LOGIN", data}
}

export function UserLogOff(){
    return {type: "LOGOFF" }
}
