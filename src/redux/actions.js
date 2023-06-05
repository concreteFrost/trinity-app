import {
  GET_DOORSTAFF_LIST, GET_SIA_DATA,
  CLEAR_SIA_DATA, LOGOFF, LOGIN, SHOW_ERROR_ON_LOGIN, CLEAR_ERROR_ON_LOGIN
} from "./types";



//LOGIN ACTIONS
export function SetLoginDetails(data) {
  return { type: LOGIN, data };
}

export function UserLogOff() {
  return { type: LOGOFF };
}

//SIA ACTIONS
export function GetSiaData(data) {
  return { type: GET_SIA_DATA, data };
}

export function ClearSiaData() {
  return { type: CLEAR_SIA_DATA };
}

//DOORSTAFF TABLE ACTIONS
export function SetDoorStaffList(data) {
  return { type: GET_DOORSTAFF_LIST, data };
}

export function SetErrorOnLogin() {
  return { type: SHOW_ERROR_ON_LOGIN }
}

export function ClearErrorOnLogin() {
  return { type: CLEAR_ERROR_ON_LOGIN }
}


