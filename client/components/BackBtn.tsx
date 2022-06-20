import React from "react";
import { useRouter } from "next/router";

import globalStyles from "../styles/Globals.module.css";

export default function BackToHomeBtn({ backTo }: { backTo?: string }) {
	const router = useRouter();
	const goBack = () => {
		if (backTo) {
			router.replace(backTo);
		} else {
			router.back();
		}
	};
	return (
		<div className={globalStyles.backBtnCircle} onClick={goBack}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				className="bi bi-chevron-left"
				viewBox="0 0 16 16"
			>
				<path
					fillRule="evenodd"
					d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
				/>
			</svg>
		</div>
	);
}
