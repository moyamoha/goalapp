import {
  addTodo,
  removeTodo,
  setLoadingTodos,
  setTodoError,
  setTodos,
} from "@state/slices/todo.slice";
import IStore, { AppDispatch, ITodoDoc, TodoStatus } from "@state/types";
import axios from "axios";

export const getAll = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoadingTodos(true));
    try {
      const response = await axios.get("/todos");
      dispatch(setTodos(response.data));
    } catch (e) {}
  };
};

export const getTodosOfAGoal = (goalId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoadingTodos(true));
    try {
      const response = await axios.get("/todos?goalId=" + goalId);
      dispatch(setTodos(response.data));
    } catch (e) {}
  };
};

export const deleteTodo = (todoId: string) => {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const allTodos = getState().todos.todos;
      const i = allTodos.findIndex((t) => t._id === todoId);
      if (i === -1) {
        dispatch(setTodoError("todo not found"));
        return;
      }
      await axios.delete("/todos/" + todoId);
      dispatch(removeTodo(i));
    } catch (e) {}
  };
};

export const createTodo = (goalId: string, todo: Partial<ITodoDoc>) => {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const response = await axios.post(`/todos/`, {
        ...todo,
        status: TodoStatus.DRAFT,
        goalId: goalId,
      });
      dispatch(addTodo(response.data));
    } catch (e) {}
  };
};
