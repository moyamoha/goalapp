import React from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { logout } from "../state/slices/auth.slice";
import SmartLink from "./SmartLink";

import navStyles from "@styles/Navbar.module.css";

function Navbar() {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const logoutUser = () => {
		dispatch(logout());
		localStorage.clear();
	};

	return (
		<nav className={navStyles.navbar}>
			<SmartLink
				href="/home"
				className={navStyles.navlink}
				fallback="/"
				text="Home"
			></SmartLink>
			<SmartLink
				href="/create"
				className={navStyles.navlink}
				fallback="/login"
				text="Create"
			></SmartLink>
			{user ? (
				<>
					<span className={navStyles.navlink} onClick={logoutUser}>
						Log out
					</span>
					<Link href="/settings">
						<a className={navStyles.navlink}>Settings</a>
					</Link>
				</>
			) : (
				<>
					<Link href="/login">
						<a className={navStyles.navlink}>Login</a>
					</Link>
					<Link href="/signup">
						<a className={navStyles.navlink}>Sign up</a>
					</Link>
				</>
			)}
		</nav>
	);
}

export default Navbar;
