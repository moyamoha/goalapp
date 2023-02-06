import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";

import { IUserDoc } from "../types";

type InitialStateType = {
  user: IUserDoc | null;
  authError: string;
  isLoggingIn: boolean;
};

const initialState: InitialStateType = {
  user: null,
  authError: "",
  isLoggingIn: false,
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
    setIsLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { setUser, logout, setAuthError, setIsLoggingIn } =
  authSlice.actions;
export default authSlice.reducer;
