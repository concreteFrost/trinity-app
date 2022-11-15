import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { combineReducers } from "redux";
import { doorstaffOnSite } from "./doorstaffOnSiteReducer";



const appReducer = combineReducers({
  userReducer,siaReducer, doorstaffOnSite
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    console.log('logout')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}