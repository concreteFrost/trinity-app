import { userReducer } from "./userReducer";
import { siaReducer } from "./siaReducer";
import { doorstaffReducer } from "./doorstaffReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
import { combineReducers } from "redux";
import { summaryReducer } from "./summaryReducer";
import { modalMessageReducer } from "./modalMessageReducer";
import { modalLogoutReducer } from "./modalLogoutReducer";
import { loaderReducer } from "./loaderReducer";
import { getActivityReducer } from "./getActivityReducer";
import { authoriseReducer } from "./authoriseReducer";
import { modalPromptReducer } from "./modalPromptReducer";
import { modalActionReducer } from "./modalActionReducer";
import { searchActivitiesReducer } from "./searchActivitesReducer";
import { searchHistoryReducer } from "./searchHistoryReducer";
import { LOGOFF } from "../types";
import { pubManagerAnalyticsReducer } from "./pubManagerAnalyticsReducer";
import { areaManagerAnalyticsReducer } from "./areaManagerAnalyticsReducer";
import { receiptReducer } from "./receiptReducer";

const appReducer = combineReducers({
  userReducer, siaReducer, doorstaffReducer,
  costsReducer, activityReducer, getActivityReducer,
  authoriseReducer, summaryReducer, searchActivitiesReducer,
  searchHistoryReducer,
  modalMessageReducer, modalPromptReducer, modalLogoutReducer, modalActionReducer, loaderReducer, pubManagerAnalyticsReducer,
  areaManagerAnalyticsReducer, receiptReducer
})

export const rootReducer = (state, action) => {
  if (action.type === LOGOFF) {
    localStorage.removeItem('user')
    localStorage.removeItem("lastRoute")
    return appReducer(undefined, action)

  }
  return appReducer(state, action)
}