import React from "react";
import authStyles from "../styles/AuthLayout.module.css";
import globalStyles from "../styles/Globals.module.css";
import Link from "next/link";

export default function AuthLayout({ children }: { children: any }) {
	return (
		<main className={authStyles.authCont}>
			<div className={authStyles.authModal}>
				{children}
				<Link href={"/"}>
					<a className={globalStyles.link}>Back to home</a>
				</Link>
			</div>
		</main>
	);
}
