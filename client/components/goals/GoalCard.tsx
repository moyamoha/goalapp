import React from "react";
import { BiTrash } from "react-icons/bi";

import { useAppDispatch } from "@state/hooks";
import { deleteGoal } from "@state/thunks/goals.thunk";
import { IGoalDoc } from "@state/types";
import SmartLink from "../SmartLink";

import globalStyles from "@styles/Globals.module.css";
import CardStyles from "@styles/Card.module.css";
import Celebrate from "../Celebrate";

export default function GoalCard({ goal }: { goal: IGoalDoc }) {
  const dispatch = useAppDispatch();

  const handleTrashClick = () => {
    if (window.confirm('Delete "' + goal.title + '"?')) {
      dispatch(deleteGoal(goal._id));
    } else return;
  };

  return (
    <div className={CardStyles.card}>
      <strong>{goal.title}</strong>
      <span style={{ color: "#777", fontSize: "0.9rem" }}>
        Created at: {new Date(goal.dateCreated).toLocaleString()}
      </span>
      <p>{goal.description}</p>
      {goal.reached ? (
        <>
          <span style={{ color: "#656565", fontSize: "0.9rem" }}>
            Reached at: {new Date(goal.reached.date).toLocaleString()}
          </span>
          {goal.reached.celebrationText ? (
            <p>You said: {goal.reached.celebrationText} </p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <span>
        <SmartLink
          href={`/goals/${goal._id}`}
          fallback="/login"
          className={globalStyles.link}
          text="See more or edit"
        ></SmartLink>
      </span>
      <BiTrash
        onClick={handleTrashClick}
        className={CardStyles.deleteIcon}
        size={21}
      />
      {goal.reached ? <Celebrate></Celebrate> : <></>}
    </div>
  );
}
