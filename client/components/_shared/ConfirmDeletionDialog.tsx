import React from "react";

import globalStyles from "@styles/Globals.module.css";
import settingsStyle from "@styles/Settings.module.css";
import { AiOutlineClose } from "react-icons/ai";

type ConfirmDeletionDialogPropsType = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  msg: string;
};

export default function ConfirmDeletionDialog({
  showDialog,
  setShowDialog,
  onDelete,
  msg,
}: ConfirmDeletionDialogPropsType) {
  const handleConfirmDelete = () => {
    onDelete();
  };
  const handleCancel = () => {
    setShowDialog(false);
  };
  return (
    <dialog className={settingsStyle.deletionDialog} open={showDialog}>
      <AiOutlineClose
        size={20}
        className={settingsStyle.closeIcon}
        onClick={handleCancel}
      ></AiOutlineClose>
      <p>{msg}</p>
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          className={globalStyles.dangerBtn}
          onClick={handleConfirmDelete}
        >
          Yes, delete
        </button>
        <button className={globalStyles.primaryBtn} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </dialog>
  );
}

const dialogStyle = {
  minWidth: "300px",
  width: "fit-content",
  height: "fit-content",
  minHeight: "150px",
  boxShadow: "5px 5px 50px 48px rgba(4,0,0,0.47)",
  top: "40%",
};
