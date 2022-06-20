import React from "react";

import SmartLink from "./SmartLink";

import introStyles from "@styles/Intro.module.css";

export default function Intro() {
	return (
		<div className={introStyles.introCont}>
			<p>
				<strong>Hey ambitious person!</strong> We made it! We made this
				application exclusively for goal-oriented people like you. You can keep
				track of your short-term as well as your long-term goals with ease. And
				don&apos;t forget to celebrate your achievements. So enjoy this simple
				yet meaningfull application.
			</p>
			<SmartLink
				href="/home"
				fallback="/login"
				className={introStyles.introBtn}
				text="Get started &rarr;"
			></SmartLink>
		</div>
	);
}
