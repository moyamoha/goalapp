import React from "react";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import GoalForm from "@components/GoalForm";
import { useAppSelector, useRedirectIfUnauthorized } from "../../state/hooks";
import { IGoalDoc } from "../../state/types";
import BackBtn from "@components/BackBtn";

export default function Goal() {
	useRedirectIfUnauthorized();
	const router = useRouter();
	const { id } = router.query;
	const goals = useAppSelector((state) => state.goals.goals);
	const goal = goals.find((g) => g._id === id) as IGoalDoc;

	return (
		<Layout>
			<GoalForm goal={goal}></GoalForm>
			<BackBtn backTo="/home"></BackBtn>
		</Layout>
	);
}
