import React from "react";

import globalStyles from "@styles/Globals.module.css";
import settingsStyle from "@styles/Settings.module.css";
import { AiOutlineClose } from "react-icons/ai";

type ConfirmDeletionDialogPropsType = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  identifier: string;
};

export default function ConfirmDeletionDialog({
  showDialog,
  setShowDialog,
  onDelete,
  identifier,
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
      <p>
        You are about to delete {identifier}, action is reversible, are your
        sure?
      </p>
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          className={globalStyles.dangerBtn}
          onClick={handleConfirmDelete}
        >
          ! Delete it anyway !
        </button>
        <button className={globalStyles.primaryBtn} onClick={handleCancel}>
          No, I will keep it
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
