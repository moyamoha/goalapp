import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import Router from "next/router";
import { IUserDoc, IProfile } from "../types";

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
		setProfile: (state, action: PayloadAction<IProfile>) => {
			if (state.user) {
				state.user.profile = action.payload;
			}
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

export const { setUser, setProfile, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;
