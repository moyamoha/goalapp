import React, { useCallback, useMemo, useState } from "react";

import { useAppDispatch } from "@state/hooks";
import { createGoal, editGoal } from "@state/thunks/goals.thunk";
import { IGoalDoc } from "@state/types";
import { getDateFieldValue } from "../../../utils";

import globalStyles from "@styles/Globals.module.css";
import goalFormStyles from "@styles/GoalForm.module.css";

export default function GoalForm({ goal }: { goal: IGoalDoc | null }) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: goal ? goal.title : "",
    description: goal ? goal.description : "",
    targetDate: goal ? goal.targetDate : new Date().toISOString(),
    importance: goal ? goal.importance : 3,
  });
  const [reachedData, setReachedData] = useState({
    date: goal && goal?.reached ? goal.reached.date : "",
    celebrationText: goal && goal?.reached ? goal.reached.celebrationText : "",
  });
  const [reached, setReached] = useState(goal?.reached !== undefined || false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitData = reached
      ? {
          ...formData,
          reached: {
            ...reachedData,
          },
        }
      : {
          ...formData,
        };
    if (!goal) {
      dispatch(createGoal(submitData));
    } else {
      dispatch(editGoal(goal._id, submitData));
    }
  };

  return (
    <form id={goalFormStyles.goalForm} onSubmit={handleSubmit}>
      <div className={globalStyles.formLine}>
        <label htmlFor="title">Title</label>
        <input
          className={globalStyles.input}
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></input>
      </div>
      <div className={globalStyles.formLine}>
        <label htmlFor="title">description</label>
        <textarea
          className={globalStyles.input}
          id="title"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className={globalStyles.formLine}>
        <label htmlFor="imp">importance</label>
        <input
          className={globalStyles.input}
          id="imp"
          type="number"
          required
          value={formData.importance}
          onChange={(e) =>
            setFormData({ ...formData, importance: parseInt(e.target.value) })
          }
          min="1"
          max="5"
        ></input>
      </div>
      <div className={globalStyles.formLine}>
        <label htmlFor="ideal">Ideal date to achieve goal?</label>
        <input
          className={globalStyles.input}
          id="ideal"
          type="date"
          value={getDateFieldValue(formData.targetDate)}
          onChange={(e) =>
            setFormData({
              ...formData,
              targetDate: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="rchd">Goal reached?</label>
        <input
          id="rchd"
          type="checkbox"
          checked={reached}
          onChange={() => setReached(!reached)}
          className={globalStyles.input}
        ></input>
      </div>
      {reached ? (
        <>
          <div className={globalStyles.formLine}>
            <label htmlFor="dateAchieved">Date of achieving:</label>
            <input
              className={globalStyles.input}
              id="dateAchieved"
              type="date"
              required
              value={getDateFieldValue(reachedData.date)}
              onChange={(e) =>
                setReachedData({
                  ...reachedData,
                  date: e.target.value,
                })
              }
            ></input>
          </div>
          <div className={globalStyles.formLine}>
            <label htmlFor="celeb">Celebrate by your emotions 😍</label>
            <textarea
              className={globalStyles.input}
              id="celeb"
              value={reachedData.celebrationText}
              onChange={(e) =>
                setReachedData({
                  ...reachedData,
                  celebrationText: e.target.value,
                })
              }
            ></textarea>
          </div>
        </>
      ) : (
        <></>
      )}
      <button className={globalStyles.primaryBtn} type="submit">
        Submit
      </button>
    </form>
  );
}
