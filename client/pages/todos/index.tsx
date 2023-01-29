import React, { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
  useRedirectIfUnauthorized,
} from "@state/hooks";
import { getAll } from "@state/thunks/todo.thunk";
import TodoCard from "@components/todos/TodoCard";
import Layout from "@components/Layout";

export default function Todos() {
  useRedirectIfUnauthorized();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((s) => s.todos.todos);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <Layout>
      <div>
        {todos.length > 0 ? (
          <>
            <span>All your todos</span>
            {todos.map((t) => (
              <TodoCard key={t._id} todo={t}></TodoCard>
            ))}
          </>
        ) : (
          <>No todos</>
        )}
      </div>
    </Layout>
  );
}
