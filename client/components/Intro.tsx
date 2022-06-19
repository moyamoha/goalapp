import Link from "next/link";
import React from "react";
import { useAppSelector } from "../state/hooks";
import introStyles from "../styles/Intro.module.css";

export default function Intro() {
	const user = useAppSelector((state) => state.auth.user);
	return (
		<div className={introStyles.introCont}>
			<p>
				<strong>Hey ambitious person!</strong> We made it! We made this
				application exclusively for goal-oriented people like you. You can keep
				track of your short-term as well as your long-term goals with ease. And
				don&apos;t forget to celebrate your achievements. So enjoy this simple
				yet meaningfull application.
			</p>
			<Link href={user ? "/home" : "/login"}>
				<a className={introStyles.introBtn}>Get started &rarr;</a>
			</Link>
		</div>
	);
}
