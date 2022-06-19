import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import GoalForm from "../../components/GoalForm";
import { useAppSelector } from "../../state/hooks";
import { IGoalDoc } from "../../state/types";

export default function Goal() {
	const user = useAppSelector((state) => state.auth.user);
	const router = useRouter();
	useEffect(function () {
		if (!user) {
			router.replace("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { id } = router.query;
	const goals = useAppSelector((state) => state.goals.goals);
	const goal = goals.find((g) => g._id === id) as IGoalDoc;
	return (
		<Layout>
			<GoalForm goal={goal}></GoalForm>
		</Layout>
	);
}
