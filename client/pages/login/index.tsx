import Link from "next/link";
import React from "react";
import LoginForm from "../../components/LoginForm";
import authStyles from "../../styles/AuthLayout.module.css";
import globalStyles from "../../styles/Globals.module.css";
import AuthLayout from "../../components/AuthLayout";

export default function Index() {
	return (
		<AuthLayout>
			<LoginForm></LoginForm>
			<p>
				Don&apos;t have an account?{" "}
				<Link href={"/signup"}>
					<a className={globalStyles.link}>Sign up</a>
				</Link>
			</p>
		</AuthLayout>
	);
}
