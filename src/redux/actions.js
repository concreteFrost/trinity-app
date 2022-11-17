

//LOGIN ACTIONS
export function SetLoginDetails(data) {
  return { type: "LOGIN", data };
}

export function UserLogOff() {
  return { type: "LOGOFF" };
}

//SIA ACTIONS
export function GetSiaData(data) {
  return { type: "GET_SIA_DATA", data };
}

export function ClearSiaData() {
  return { type: "CLEAR_SIA_DATA" };
}

//DOORSTAFF TABLE ACTIONS
export function SetDoorStaffList(data) {
  return { type: "SET_DOORSTAFF_LIST", data };
}


