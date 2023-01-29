import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/auth.slice";
import goalReducer from "./slices/goals.slice";
import quoteReducer from "./slices/quotes.slice";
import todoReducer from "./slices/todo.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalReducer,
  quotes: quoteReducer,
  todos: todoReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
