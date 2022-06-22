import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

import styles from "@styles/Home.module.css";
import ZenQuote from "./ZenQuote";

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Navbar></Navbar>
			<ZenQuote></ZenQuote>
			<main className={styles.main}>{children}</main>
			<Footer></Footer>
		</>
	);
}
