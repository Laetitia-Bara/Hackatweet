import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import tweet from "./reducers/tweet";
// import tweets, hashtag, theme ...

const persistConfig = {
  key: "hackatweet",
  storage,
  whitelist: ["user", "tweet"],
};

const rootReducer = combineReducers({
  user,
  tweet,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
