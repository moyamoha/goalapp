import React from "react";
import { BiErrorAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import { useAppDispatch } from "@state/hooks";
import { setAuthError } from "@state/slices/auth.slice";
import { setError } from "@state/slices/goals.slice";

export default function ErrorAlert({ message }: { message: string }) {
  const dispatch = useAppDispatch();

  const dismisAlert = () => {
    dispatch(setAuthError(""));
    dispatch(setError(""));
  };
  return (
    <div style={errorStyle}>
      <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <BiErrorAlt />
        {message}
      </p>
      <AiOutlineClose onClick={dismisAlert} />
    </div>
  );
}

const errorStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "7px 12px",
  fontSize: "0.95rem",
  height: "fit-content",
  width: "100",
  maxWidth: "500px",
  backgroundColor: "#fdeded",
  marginTop: "1rem",
  color: "#4d2525",
  borderRadius: "5px",
};
