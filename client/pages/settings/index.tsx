import React from "react";

import Layout from "@components/Layout";
import { useRedirectIfUnauthorized } from "../../state/hooks";

import globalStyles from "@styles/Globals.module.css";
import BackBtn from "@components/BackBtn";
import SmartLink from "@components/SmartLink";

export default function Settings() {
	useRedirectIfUnauthorized();
	return (
		<Layout>
			<SmartLink
				href="/settings/profile"
				fallback="/login"
				className={globalStyles.link}
				text="Profile settings &rarr;"
			></SmartLink>
			<SmartLink
				href="/settings/account"
				fallback="/login"
				className={globalStyles.link}
				text="Account settings &rarr;"
			></SmartLink>
			<BackBtn backTo="/home"></BackBtn>
		</Layout>
	);
}
