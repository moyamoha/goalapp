import { TodoStatus } from "@state/types";
import React from "react";
import { getTodoStatusChipColor } from "./todoChipColor";

export default function TodoStatusChip({ status }: { status: TodoStatus }) {
  const getStyle = () => {
    const style = {
      display: "flex",
      alignItems: "center",
      padding: "5px 10px",
      borderRadius: "20px",
      color: getTodoStatusChipColor(status).color,
    };
    return style;
  };
  return <div style={getStyle()}>{status}</div>;
}
