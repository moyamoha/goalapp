import store from "./store";

export interface IGoalDoc {
	_id: string;
	title: string;
	description?: string;
	dateCreated: string;
	importance: number;
	targetDate: string;
	reached?: {
		date: string;
		celebrationText: string;
	};
	userId: string;
}

export interface IUserDoc {
	email: string;
	firstname: string;
	lastname: string;
	dateOfBirth: string;
	profile: IProfile;
}

export interface IProfile {
	theme?: "dark" | "light" | "system";
	monthsToDelete?: 3 | 6 | 12;
	timezoneOffset?: number;
	personality?: "dreamer" | "realistic";
	nickname?: string;
}

export type IStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default IStore;
