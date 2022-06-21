import axios from "axios";
import Router from "next/router";
import jwtDecode from "jwt-decode";

import { logout, setAuthError, setUser } from "../slices/auth.slice";
import IStore, { AppDispatch, IProfile, IUserDoc } from "../types";

interface IDecodedToken extends Partial<IUserDoc> {
	iat?: number;
}

export const getUserFromToken = () => {
	return (dispatch: AppDispatch, getState: () => IStore) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			const decoded = jwtDecode(token) as IDecodedToken;
			const user = {
				...decoded,
			};
			delete user.iat;
			dispatch(setUser(user as IUserDoc));
			Router.replace("/home");
		} else {
			Router.replace("/login");
		}
	};
};

export const login = (credintials: { email: string; password: string }) => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
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
		}
	};
};

export const registerUser = (userData: UserRegData) => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
		try {
			await axios.post("/users", userData);
			Router.replace("/login");
		} catch (e: any) {
			dispatch(setAuthError(e.response.data.message));
		}
	};
};

export const updateProfile = (profData: Partial<IProfile>) => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
		try {
			const response = await axios.put("/users/profile", profData);
			dispatch(
				setUser({
					...getState().auth.user,
					profile: response.data,
				} as IUserDoc)
			);
			Router.replace("/home");
		} catch (e: any) {
			dispatch(setAuthError(e.response.data.message));
		}
	};
};

export const updateAccountInfo = (accountData: Partial<IUserDoc>) => {
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
			dispatch(logout());
		} catch (e) {}
	};
};

type UserRegData = {
	email: string;
	password: string;
	lastname: string;
	firstname: string;
	dateOfBirth: string;
};
