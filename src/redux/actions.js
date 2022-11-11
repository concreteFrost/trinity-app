
export function SetLoginDetails(data) {
    return {type: "LOGIN", data}
}

export function UserLogOff(){
    return {type: "LOGOFF" }
}

export function GetSiaData(data){
    return {type: "LOOKUP", data}
}
