import Link from "next/link";
import React from "react";
import { useAppDispatch } from "../state/hooks";
import { deleteGoal } from "../state/thunks/goals.thunk";
import { IGoalDoc } from "../state/types";
import globalStyles from "../styles/Globals.module.css";
import goalCardStyles from "../styles/GoalCard.module.css";

export default function GoalCard({ goal }: { goal: IGoalDoc }) {
	const dispatch = useAppDispatch();

	const handleTrashClick = () => {
		if (window.confirm('Delete "' + goal.title + '"?')) {
			dispatch(deleteGoal(goal._id));
		} else return;
	};

	return (
		<div className={goalCardStyles.card}>
			<strong>{goal.title}</strong>
			<span style={{ color: "#777", fontSize: "0.9rem" }}>
				Created at: {new Date(goal.dateCreated).toLocaleString()}
			</span>
			<p>{goal.description}</p>
			<span>
				<Link href={`/goals/${goal._id}`}>
					<a className={globalStyles.link}>See more or edit</a>
				</Link>
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="currentColor"
				className={`bi bi-trash3 ` + goalCardStyles.deleteIcon}
				viewBox="0 0 16 16"
				onClick={handleTrashClick}
			>
				<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
			</svg>
		</div>
	);
}
