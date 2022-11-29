import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffOnSiteReducer } from "./doorstaffOnSiteReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";
import { modalMessageReducer } from "./modalMessageReducer";
import { loaderReducer } from "./loaderReducer";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffOnSiteReducer,
  costsReducer, activityReducer, summaryReducer,
  modalMessageReducer, loaderReducer
})

export const rootReducer = (state, action) => {
  console.log('app reducer',state)
  if(action.type === 'LOGOFF'){
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}