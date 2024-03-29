import axios from "axios";
import Router from "next/router";

import { setGoals, setLoading } from "../slices/goals.slice";
import IStore, { AppDispatch, IGoalDoc } from "../types";
import { replaceGoal, addGoal, removeGoal } from "../slices/goals.slice";

export const getAll = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await axios.get("/goals");
			dispatch(setGoals(response.data));
		} catch (e) {}
	};
};

export const deleteGoal = (id: string) => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
		try {
			await axios.delete(`/goals/${id}`);
			const index = getState()
				.goals.goals.map((g) => g._id)
				.indexOf(id);
			dispatch(removeGoal(index));
		} catch (e) {}
	};
};

export const editGoal = (id: string, goal: Partial<IGoalDoc>) => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
		try {
			const index = getState()
				.goals.goals.map((g) => g._id)
				.indexOf(id);
			const reqData: IGoalDoc = {
				...getState().goals.goals[index],
				...goal,
			};
			if (!goal.reached) delete reqData.reached;
			const response = await axios.put(`/goals/${id}`, reqData);
			dispatch(replaceGoal({ index: index, data: response.data }));
			Router.replace("/home");
		} catch (e) {}
	};
};

export const createGoal = (goal: Partial<IGoalDoc>) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await axios.post("/goals/", goal);
			dispatch(addGoal(response.data));
			Router.replace("/home");
		} catch (e) {}
	};
};
