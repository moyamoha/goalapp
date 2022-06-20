import { useRouter } from "next/router";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { IStore, AppDispatch } from "./types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IStore> = useSelector;

export const useRedirectIfUnauthorized = () => {
	const user = useAppSelector((s) => s.auth.user);
	const router = useRouter();
	useEffect(
		function () {
			if (!user) {
				router.replace("/login");
			}
		},
		[user, router]
	);
};
