import { userReducer } from "./userReducer";
import {siaReducer} from "./siaReducer";
import { doorstaffReducer } from "./doorstaffReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";
import { modalMessageReducer } from "./modalMessageReducer";
import { loaderReducer } from "./loaderReducer";
import { getActivityReducer } from "./getActivityReducer";
import { authoriseReducer } from "./authoriseReducer";
import { modalPromptReducer } from "./modalPromptReducer";


const appReducer = combineReducers({
  userReducer,siaReducer,doorstaffReducer,
  costsReducer, activityReducer, getActivityReducer, authoriseReducer,summaryReducer,
  modalMessageReducer, modalPromptReducer, loaderReducer
})

export const rootReducer = (state, action) => {
  if(action.type === 'LOGOFF'){
    localStorage.removeItem('user')
    return appReducer(undefined, action) 
    
  }
  return appReducer(state, action)
}