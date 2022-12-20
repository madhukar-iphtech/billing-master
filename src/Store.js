import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { homeReducer } from "./redux/reducer/homeReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persitConfig = {
  key: "persist-store",
  storage,
};
const persistedReducer = persistReducer(persitConfig, homeReducer);
export const Store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(Store);
// export const Store = createStore(homeReducer);
