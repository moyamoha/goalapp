import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import goalReducer from "./slices/goals.slice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		goals: goalReducer,
	},
});

export default store;
