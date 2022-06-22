import axios from "axios";

import IStore, { AppDispatch } from "../types";
import { setQuotes } from "state/slices/quotes.slice";

export const getQuotes = () => {
	return async (dispatch: AppDispatch, getState: () => IStore) => {
		try {
			const url = "https://type.fit/api/quotes";
			const response = await fetch(url);
			const data = await response.json();
			dispatch(setQuotes(data));
		} catch (e: any) {}
	};
};
