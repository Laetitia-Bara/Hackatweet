import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import persistReducer from "redux-persist/es/persistReducer";
// import tweets, hashtag, theme ...

const persistConfig = {
  key: "hackatweet",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

const persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
