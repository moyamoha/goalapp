import React, { useMemo, useState } from "react";
import { BiTrash } from "react-icons/bi";

import { useAppDispatch } from "@state/hooks";
import { deleteGoal } from "@state/thunks/goals.thunk";
import { IGoalDoc } from "@state/types";
import SmartLink from "../SmartLink";

import globalStyles from "@styles/Globals.module.css";
import CardStyles from "@styles/Card.module.css";
import Celebrate from "../Celebrate";
import ConfirmDeletionDialog from "@components/_shared/ConfirmDeletionDialog";
import Link from "next/link";
import { useRouter } from "next/router";

export default function GoalCard({ goal }: { goal: IGoalDoc }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);

  const handleDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  const goToTodosPage = () => {
    router.push(`/todos?goalId=${goal._id}`);
  };

  const deleteGoalConfirmationMsg = useMemo(() => {
    return `Do you really want to delete the goal "${goal.title}"`;
  }, [goal]);

  return (
    <div className={CardStyles.card}>
      <ConfirmDeletionDialog
        showDialog={showDeletionDialog}
        setShowDialog={setShowDeletionDialog}
        msg={deleteGoalConfirmationMsg}
        onDelete={handleDelete}
      />
      <span
        style={{ position: "absolute", bottom: "10px", right: "10px" }}
        onClick={() => goToTodosPage()}
        className={globalStyles.link}
      >
        see progress
      </span>
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
        onClick={() => setShowDeletionDialog(true)}
        className={CardStyles.deleteIcon}
        size={21}
      />
      {goal.reached ? <Celebrate></Celebrate> : <></>}
    </div>
  );
}
