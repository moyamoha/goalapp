import React, { useState } from "react";

import { ITodoDoc, TodoStatus } from "@state/types";

import CardStyles from "@styles/Card.module.css";
import { BiTrash } from "react-icons/bi";
import SmartLink from "@components/SmartLink";
import { getTodoStatusColor } from "./todoColor";
import { getDateFieldValue, isValidStr } from "utils";
import { useAppDispatch } from "@state/hooks";
import { deleteTodo } from "@state/thunks/todo.thunk";
import ConfirmDeletionDialog from "@components/_shared/ConfirmDeletionDialog";

export default function TodoCard({ todo }: { todo: ITodoDoc }) {
  const dispatch = useAppDispatch();
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <div className={CardStyles.card}>
      <ConfirmDeletionDialog
        showDialog={showDeletionDialog}
        setShowDialog={setShowDeletionDialog}
        onDelete={handleDelete}
        identifier={`"${todo.title}"`}
      />
      <strong>{todo.title}</strong>
      <span style={{ color: "#777", fontSize: "0.9rem" }}>
        Created at: {new Date(todo.dateCreated).toLocaleString()}
      </span>
      {todo.description ? <p>{todo.description}</p> : <></>}
      <span>
        Status:{" "}
        <span style={{ color: getTodoStatusColor(todo.status) }}>
          {todo.status}{" "}
          {todo.status === TodoStatus.COMPLETED && todo.completedAt
            ? "at " +
              new Date(todo.completedAt).toLocaleDateString() +
              " " +
              new Date(todo.completedAt).toLocaleTimeString()
            : ""}
        </span>
      </span>
      <span>
        <SmartLink
          href={`/goals/${todo._id}`}
          fallback="/login"
          className={CardStyles.link}
          text="See more or edit"
        ></SmartLink>
      </span>
      <BiTrash
        onClick={() => setShowDeletionDialog(true)}
        className={CardStyles.deleteIcon}
        size={21}
      />
    </div>
  );
}
