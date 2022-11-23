import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffOnSiteReducer } from "./doorstaffOnSiteReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";
import { modalMessageReducer } from "./modalMessageReducer";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffOnSiteReducer,
  costsReducer, activityReducer, summaryReducer,
  modalMessageReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}