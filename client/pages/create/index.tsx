import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GoalForm from "../../components/GoalForm";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../state/hooks";

export default function Create() {
	const router = useRouter();
	const user = useAppSelector((state) => state.auth.user);
	useEffect(function () {
		if (!user) {
			router.replace("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout>
			<GoalForm goal={null}></GoalForm>
		</Layout>
	);
}
