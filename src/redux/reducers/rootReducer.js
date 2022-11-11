import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer"
import { combineReducers } from "redux";


const appReducer = combineReducers({
  userReducer,siaReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    console.log('logout')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}