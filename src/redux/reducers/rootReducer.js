import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffOnSiteReducer } from "./doorstaffOnSiteReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";
import { modalMessageReducer } from "./modalMessageReducer";
import { loaderReducer } from "./loaderReducer";
import { getActivityReducer } from "./getActivityReducer";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffOnSiteReducer,
  costsReducer, activityReducer, getActivityReducer, summaryReducer,
  modalMessageReducer, loaderReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    localStorage.removeItem('user')
    return appReducer(undefined, action) 
    
  }
  return appReducer(state, action)
}