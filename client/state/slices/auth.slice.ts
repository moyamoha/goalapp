import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import { IUserDoc } from "../types";

type InitialStateType = {
	user: IUserDoc | null;
	authError: string;
};

const initialState: InitialStateType = {
	user: null,
	authError: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserDoc>) => {
			state.user = action.payload;
			state.authError = "";
		},
		logout: (state) => {
			state.user = null;
			state.authError = "";
			Router.replace("/");
		},
		setAuthError: (state, action: PayloadAction<string>) => {
			state.authError = action.payload;
		},
	},
});

export const { setUser, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;
