import axios from "axios";
import Router from "next/router";
import jwtDecode from "jwt-decode";

import {
  logout,
  setAuthError,
  setIsLoggingIn,
  setUser,
} from "../slices/auth.slice";
import IStore, { AppDispatch, IUserDoc } from "../types";

interface IDecodedToken extends Partial<IUserDoc> {
  iat?: number;
}

export const login = (credintials: { email: string; password: string }) => {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    dispatch(setIsLoggingIn(true));
    try {
      const resp = await axios.post("/auth/login", credintials);
      localStorage.setItem("accessToken", resp.data.accessToken);
      const decoded = jwtDecode(resp.data.accessToken) as IDecodedToken;
      const user = {
        ...decoded,
      };
      delete user.iat;
      dispatch(setUser(user as IUserDoc));
      Router.replace("/home");
    } catch (e: any) {
      dispatch(setAuthError(e.response.data.message));
    } finally {
      dispatch(setIsLoggingIn(false));
    }
  };
};

export const registerUser = (userData: UserReqData) => {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      await axios.post("/users", userData);
      Router.push("/login");
    } catch (e: any) {
      dispatch(setAuthError(e.response.data.message));
    }
  };
};

export const updateUser = (accountData: Partial<IUserDoc>) => {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const response = await axios.put("/users/", accountData);
      dispatch(
        setUser({
          ...getState().auth.user,
          ...response.data,
        })
      );
      Router.replace("/home");
    } catch (e: any) {
      dispatch(setAuthError(e.response.data.message));
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete("/users/");
      localStorage.removeItem("accessToken");
      localStorage.clear();
      dispatch(logout());
    } catch (e) {}
  };
};

type UserReqData = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
};
