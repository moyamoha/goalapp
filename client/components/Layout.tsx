import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

import styles from "@styles/Home.module.css";

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Navbar></Navbar>
			<main className={styles.main}>{children}</main>
			<Footer></Footer>
		</>
	);
}
