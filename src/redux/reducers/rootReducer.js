import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffOnSiteReducer } from "./doorstaffOnSiteReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffOnSiteReducer,
  costsReducer, activityReducer, summaryReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}