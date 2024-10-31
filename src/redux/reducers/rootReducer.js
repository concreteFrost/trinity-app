import { LOGOFF } from "../types/loginTypes";
import persistedReducer from "./persistConfig"; // Импорт persistedReducer

export const rootReducer = (state, action) => {
  if (action.type === LOGOFF) {
    localStorage.removeItem("user");
    localStorage.removeItem("lastRoute");
    localStorage.removeItem("persist:root");
    return persistedReducer(undefined, action);
  }
  return persistedReducer(state, action);
};
