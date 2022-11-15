

export function SetLoginDetails(data) {
    return {type: "LOGIN", data}
}

export function UserLogOff(){
    return {type: "LOGOFF" }
}

export function GetSiaData(data){
    return {type: "LOOKUP", data}
}

export function ClearSiaData(){
    return {type: "CLEAR"}
}

export function GetDoorStaff(data){
    return {type:"GET_DOORSTAFF", data}
}
