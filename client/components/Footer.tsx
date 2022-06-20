import React from "react";
import styles from "@styles/Footer.module.css";
import globalStyles from "@styles/Globals.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a href="https://yahyasalimi.netlify.app" className={globalStyles.link}>
				Yahya Salimi
			</a>
		</footer>
	);
}
