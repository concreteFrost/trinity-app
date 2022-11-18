import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffOnSiteReducer } from "./doorstaffOnSiteReducer";
import { costsReducer } from "./costsReducer";
import { combineReducers } from "redux";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffOnSiteReducer,
  costsReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}