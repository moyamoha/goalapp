import React from "react";
import authStyles from "@styles/AuthLayout.module.css";
import globalStyles from "@styles/Globals.module.css";
import SmartLink from "./SmartLink";

export default function AuthLayout({ children }: { children: any }) {
	return (
		<main className={authStyles.authCont}>
			<div className={authStyles.authModal}>
				{children}
				<SmartLink
					href="/"
					className={globalStyles.link}
					text="Back to home"
				></SmartLink>
			</div>
		</main>
	);
}
