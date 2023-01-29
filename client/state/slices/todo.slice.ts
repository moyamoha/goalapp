import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodoDoc } from "../types";

type InitialStateType = {
  todos: ITodoDoc[];
  loadingTodos: boolean;
  todoError: string;
};

const initialState: InitialStateType = {
  todos: [],
  loadingTodos: false,
  todoError: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    setTodoError: (state, action: PayloadAction<string>) => {
      state.todoError = action.payload;
    },
    setLoadingTodos: (state, action: PayloadAction<boolean>) => {
      state.loadingTodos = action.payload;
    },
    setTodos: (state, action: PayloadAction<ITodoDoc[]>) => {
      state.todos = action.payload;
      state.todoError = "";
      state.loadingTodos = false;
    },
    addTodo: (state, action: PayloadAction<ITodoDoc>): void => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>): void => {
      state.todos.splice(action.payload, 1);
    },
    replaceTodo: (
      state,
      action: PayloadAction<{ index: number; data: ITodoDoc }>
    ): void => {
      state.todos.splice(action.payload.index, 1, action.payload.data);
    },
  },
});

export const {
  setTodoError,
  setLoadingTodos,
  setTodos,
  addTodo,
  removeTodo,
  replaceTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
