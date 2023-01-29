import React from "react";

import { ITodoDoc } from "@state/types";

import CardStyles from "@styles/Card.module.css";
import { BiTrash } from "react-icons/bi";
import SmartLink from "@components/SmartLink";
import { getTodoStatusColor } from "./todoColor";

export default function TodoCard({ todo }: { todo: ITodoDoc }) {
  const handleClickTrash = () => {};

  return (
    <div className={CardStyles.card}>
      <strong>{todo.title}</strong>
      <span style={{ color: "#777", fontSize: "0.9rem" }}>
        Created at: {new Date(todo.dateCreated).toLocaleString()}
      </span>
      {todo.description ? <p>{todo.description}</p> : <></>}
      <span>
        Status:{" "}
        <span style={{ color: getTodoStatusColor(todo.status) }}>
          {todo.status}
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
        onClick={handleClickTrash}
        className={CardStyles.deleteIcon}
        size={21}
      />
    </div>
  );
}
