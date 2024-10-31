// persistConfig.js
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { siaReducer } from "./siaReducer";
import { doorstaffReducer } from "./doorstaffReducer";
import { costsReducer } from "./costsReducer";
import { activityReducer } from "./activityReducer";
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
import { pubManagerAnalyticsReducer } from "./pubManagerAnalyticsReducer";
import { areaManagerAnalyticsReducer } from "./areaManagerAnalyticsReducer";
import { receiptReducer } from "./receiptReducer";
import { debugConsoleReducer } from "./debugConsoleReducer";

const appReducer = combineReducers({
  userReducer,
  siaReducer,
  doorstaffReducer,
  costsReducer,
  activityReducer,
  getActivityReducer,
  authoriseReducer,
  summaryReducer,
  searchActivitiesReducer,
  searchHistoryReducer,
  modalMessageReducer,
  modalPromptReducer,
  modalLogoutReducer,
  modalActionReducer,
  loaderReducer,
  pubManagerAnalyticsReducer,
  areaManagerAnalyticsReducer,
  receiptReducer,
  debugConsoleReducer,
});

// Конфигурация для `redux-persist`
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["debugConsoleReducer"], // укажите редюсеры для сохранения
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;
