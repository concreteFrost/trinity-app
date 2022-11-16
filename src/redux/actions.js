import axios from "axios"


export function SetLoginDetails(data) {
    return { type: "LOGIN", data }
}

export function UserLogOff() {
    return { type: "LOGOFF" }
}

export function GetSiaData(data) {
    return { type: "LOOKUP", data }
}

export function ClearSiaData() {
    return { type: "CLEAR" }
}

export function SetDoorStaff(data){
    return {type: "SET_DOORSTAFF",data}
}

export function DeleteDoorStaff(){
    return{type: "DELETE_DOORSTAFF"}
}

export function GetDoorstaff(token){
    return  function(dispatch){
       return  axios
        .get(
          "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupCurrentMembers",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
        console.log('sdsdsds')
        dispatch(SetDoorStaff(res.data.staffLogin))
        }).catch(e=>{console.log(e)});
    }
}
