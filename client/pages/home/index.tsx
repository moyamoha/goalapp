import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GoalCard from "@components/GoalCard";
import Layout from "@components/Layout";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getAll } from "../../state/thunks/goals.thunk";
import homeStyles from "@styles/Home.module.css";

export default function Home() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector((state) => state.auth.user);
	const goals = useAppSelector((state) => state.goals.goals);
	const loading = useAppSelector((state) => state.goals.loading);

	useEffect(function () {
		if (!user) {
			router.replace("/login");
		} else dispatch(getAll());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<h2>All your goals</h2>
			{loading ? (
				"Loading"
			) : goals.length > 0 ? (
				<div className={homeStyles.grid}>
					{goals.map((g) => (
						<GoalCard key={g._id} goal={g}></GoalCard>
					))}
				</div>
			) : (
				<span>You have no goals yet</span>
			)}
		</Layout>
	);
}
