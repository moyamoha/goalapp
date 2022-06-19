import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { logout } from "../state/slices/auth.slice";
import navStyles from "../styles/Navbar.module.css";

function Navbar() {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const logoutUser = () => {
		dispatch(logout());
	};

	return (
		<nav className={navStyles.navbar}>
			{user ? (
				<Link href={"/home"}>
					<a className={navStyles.navlink}>Home</a>
				</Link>
			) : (
				<Link href={"/"}>
					<a className={navStyles.navlink}>Home</a>
				</Link>
			)}
			<Link href={"/create"}>
				<a className={navStyles.navlink}>Create</a>
			</Link>
			{user ? (
				<>
					<span className={navStyles.navlink} onClick={logoutUser}>
						Log out
					</span>
					<Link href={"/profile"}>
						<a className={navStyles.navlink}>Profile</a>
					</Link>
				</>
			) : (
				<>
					<Link href={"/login"}>
						<a className={navStyles.navlink}>login</a>
					</Link>
					<Link href={"/signup"}>
						<a className={navStyles.navlink}>sign up</a>
					</Link>
				</>
			)}
		</nav>
	);
}

export default Navbar;
