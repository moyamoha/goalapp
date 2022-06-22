import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalDoc } from "../types";

interface IQuote {
	text: string;
	author: string;
}

type InitialStateType = {
	quotes: IQuote[] | null;
};

const initialState: InitialStateType = {
	quotes: null,
};

const quotesSlice = createSlice({
	name: "quotes",
	initialState: initialState,
	reducers: {
		setQuotes: (state, action: PayloadAction<IQuote[] | null>) => {
			state.quotes = action.payload;
		},
	},
});

export const { setQuotes } = quotesSlice.actions;

export default quotesSlice.reducer;
