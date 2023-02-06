import React, { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
  useRedirectIfUnauthorized,
} from "@state/hooks";
import { getAll, getTodosOfAGoal } from "@state/thunks/todo.thunk";
import TodoCard from "@components/todos/TodoCard";
import Layout from "@components/Layout";
import { useRouter } from "next/router";

export default function Todos() {
  useRedirectIfUnauthorized();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((s) => s.todos.todos);
  const { query } = useRouter();
  useEffect(() => {
    if (query && query.goalId) {
      dispatch(getTodosOfAGoal(query.goalId as string));
    } else {
      dispatch(getAll());
    }
  }, [query, dispatch]);

  return (
    <Layout>
      <h2>All your todos</h2>
      <div style={{ width: "60%", padding: "10px" }}>
        {todos.length > 0 ? (
          <>
            {todos.map((t) => (
              <TodoCard key={t._id} todo={t}></TodoCard>
            ))}
          </>
        ) : (
          <div>
            <span>No todos</span>
          </div>
        )}
      </div>
    </Layout>
  );
}
