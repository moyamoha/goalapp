import React from "react";
import Link from "next/link";

import AuthLayout from "../../components/AuthLayout";
import LoginForm from "../../components/LoginForm";

import globalStyles from "../../styles/Globals.module.css";

export default function Index() {
	return (
		<AuthLayout>
			<LoginForm></LoginForm>
			<p>
				Don&apos;t have an account?{" "}
				<Link href="/signup">
					<a className={globalStyles.link}></a>
				</Link>
			</p>
		</AuthLayout>
	);
}
