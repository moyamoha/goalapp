import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setShowConfirmPage } from "state/slices/auth.slice";

export default function ConfirmEmail() {
	const [secondsToRedirect, setSecondsToRedirect] = useState(10);
	const dispatch = useAppDispatch();
	const showConfirmPage = useAppSelector((state) => state.auth.showConfirmPage);
	const router = useRouter();

	useEffect(() => {
		if (!showConfirmPage) {
			router.replace("/");
		}
		const interval = setInterval(() => {
			if (secondsToRedirect === 0) {
				dispatch(setShowConfirmPage(false));
				router.replace("/login");
				return;
			}
			setSecondsToRedirect(secondsToRedirect - 1);
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondsToRedirect]);
	return (
		showConfirmPage && (
			<Layout>
				<p>
					We have sent an email requesting you to confirm your email address. In
					order to be able to use our services, we ask every new user to confirm
					their email address to prevent scam emails or robots
				</p>
				<p>Redirecting back to login page in {secondsToRedirect} seconds</p>
			</Layout>
		)
	);
}
