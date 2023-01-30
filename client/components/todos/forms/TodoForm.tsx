import { ITodoDoc } from "@state/types";
import React from "react";

export default function TodoForm({ todo }: { todo: ITodoDoc }) {
  return <div>{todo.title}</div>;
}
