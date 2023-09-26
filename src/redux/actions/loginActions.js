import * as LoginTypes from "../types/loginTypes";

export function SetLoginDetails(data) {
    return { type: LoginTypes.LOGIN, data };
  }
  
  export function UserLogOff() {
    return { type: LoginTypes.LOGOFF };
  }
  
    
  export function SetErrorOnLogin() {
    return { type: LoginTypes.SHOW_ERROR_ON_LOGIN };
  }
  
  export function ClearErrorOnLogin() {
    return { type: LoginTypes.CLEAR_ERROR_ON_LOGIN };
  }