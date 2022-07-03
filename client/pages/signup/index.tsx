import Link from "next/link";
import React from "react";

import AuthLayout from "@components/AuthLayout";
import SignupForm from "@components/SignupForm";

import globalStyles from "@styles/Globals.module.css";

export default function Signup() {
	return (
		<AuthLayout>
			<SignupForm></SignupForm>
			<p>
				Already have an account?{" "}
				<Link href={"/login"}>
					<a className={globalStyles.link}>login</a>
				</Link>
			</p>
		</AuthLayout>
	);
}
