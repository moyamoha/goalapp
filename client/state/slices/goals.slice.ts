import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalDoc } from "../types";

type InitialStateType = {
	goals: IGoalDoc[];
	loading: boolean;
	error: string;
};

const initialState: InitialStateType = {
	goals: [],
	loading: false,
	error: "",
};

const goalsSlice = createSlice({
	name: "goals",
	initialState: initialState,
	reducers: {
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setGoals: (state, action: PayloadAction<IGoalDoc[]>) => {
			state.goals = action.payload;
			state.error = "";
			state.loading = false;
		},
		addGoal: (state, action: PayloadAction<IGoalDoc>): void => {
			state.goals.push(action.payload);
		},
		removeGoal: (state, action: PayloadAction<number>): void => {
			state.goals.splice(action.payload, 1);
		},
		replaceGoal: (
			state,
			action: PayloadAction<{ index: number; data: IGoalDoc }>
		): void => {
			state.goals.splice(action.payload.index, 1, action.payload.data);
		},
	},
});

export const {
	setError,
	setLoading,
	setGoals,
	addGoal,
	removeGoal,
	replaceGoal,
} = goalsSlice.actions;

export default goalsSlice.reducer;
