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
  owner: string;
}

export enum TodoStatus {
  COMPLETED = "completed",
  DRAFT = "draft",
  CANCELLED = "cancelled",
  ONGOING = "ongoing",
}

export interface ITodoDoc {
  _id: string;
  title: string;
  description?: string;
  dateCreated: Date | string;
  status: TodoStatus;
  completedAt?: Date | string;
  goalId: string;
  owner: string;
}

export interface IUserDoc {
  email: string;
  firstname: string;
  lastname: string;
}

export type IStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default IStore;
