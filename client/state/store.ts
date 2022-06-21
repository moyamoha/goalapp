import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/auth.slice";
import goalReducer from "./slices/goals.slice";

const rootReducer = combineReducers({
	auth: authReducer,
	goals: goalReducer,
});

const persistConfig = {
	key: "root",
	storage,
	// stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
