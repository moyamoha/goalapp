import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import { IUserDoc } from "../types";

type InitialStateType = {
	user: IUserDoc | null;
	authError: string;
	showConfirmPage: boolean;
};

const initialState: InitialStateType = {
	user: null,
	authError: "",
	showConfirmPage: false,
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
		setShowConfirmPage: (state, action: PayloadAction<boolean>) => {
			state.showConfirmPage = action.payload;
		},
	},
});

export const { setUser, logout, setAuthError, setShowConfirmPage } =
	authSlice.actions;
export default authSlice.reducer;
