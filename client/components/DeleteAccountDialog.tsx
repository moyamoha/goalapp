import React from "react";

import { useAppDispatch } from "../state/hooks";
import { deleteAccount } from "../state/thunks/auth.thunk";
import globalStyles from "../styles/Globals.module.css";

type DeleteAccountDialogPropsType = {
	showDialog: boolean;
	setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountDialog({
	showDialog,
	setShowDialog,
}: DeleteAccountDialogPropsType) {
	const dispatch = useAppDispatch();

	const handleConfirmDelete = () => {
		dispatch(deleteAccount());
	};
	const handleCancel = () => {
		setShowDialog(false);
	};
	return (
		<dialog style={dialogStyle} open={showDialog}>
			<p>
				You are about to delete your account permanently. This action is
				irreversible. All your data will be erased permanently
			</p>
			<div style={{ display: "flex", gap: "15px" }}>
				<button
					className={globalStyles.dangerBtn}
					onClick={handleConfirmDelete}
				>
					! Delete it anyway !
				</button>
				<button className={globalStyles.primaryBtn} onClick={handleCancel}>
					No, I will keep my account
				</button>
			</div>
		</dialog>
	);
}

const dialogStyle = {
	minWidth: "300px",
	width: "auto",
	height: "auto",
	minHeight: "150px",
	boxShadow: "5px 5px 50px 48px rgba(4,0,0,0.47)",
	top: "50%",
	bottom: "50%",
};
