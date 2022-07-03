import React, { useState } from "react";

import {
	useAppDispatch,
	useAppSelector,
	useRedirectIfUnauthorized,
} from "../../state/hooks";
import FormStrField from "@components/FormStrField";
import Layout from "@components/Layout";
import DeleteAccountDialog from "@components/DeleteAccountDialog";
import BackBtn from "@components/BackBtn";
import { getDateFieldValue } from "../../utils";
import { updateUser } from "../../state/thunks/auth.thunk";
import ErrorAlert from "@components/ErrorAlert";

import authStyles from "@styles/AuthLayout.module.css";
import globalStyles from "@styles/Globals.module.css";

const validDeletionPeriods = [3, 6, 12];

export default function Settings() {
	const dispatch = useAppDispatch();
	useRedirectIfUnauthorized();

	const user = useAppSelector((s) => s.auth.user);
	const authError = useAppSelector((s) => s.auth.authError);

	const [email, setEmail] = useState(user?.email || "");
	const [firstname, setFirstname] = useState(user?.firstname || "");
	const [lastname, setLastname] = useState(user?.lastname || "");
	const [showDialog, setShowDialog] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			updateUser({
				email: email,
				firstname: firstname,
				lastname: lastname,
			})
		);
	};
	return (
		<Layout>
			<DeleteAccountDialog
				showDialog={showDialog}
				setShowDialog={setShowDialog}
			></DeleteAccountDialog>
			<form className={authStyles.authForm} onSubmit={handleSubmit}>
				<FormStrField
					id="email"
					label="Email"
					required
					value={email}
					setValue={setEmail}
					type="email"
				></FormStrField>
				<section className={globalStyles.formRow}>
					<FormStrField
						id="first"
						label="Firstname"
						required
						value={firstname}
						setValue={setFirstname}
						type="text"
					></FormStrField>
					<FormStrField
						id="last"
						label="Lastname"
						required
						value={lastname}
						setValue={setLastname}
						type="text"
					></FormStrField>
				</section>
				{authError !== "" ? (
					<ErrorAlert message={authError}></ErrorAlert>
				) : (
					<></>
				)}
				<section style={{ display: "flex", gap: "15px" }}>
					<button type="submit" className={globalStyles.primaryBtn}>
						Save changes
					</button>
					<button
						type="button"
						className={globalStyles.dangerBtn}
						onClick={() => setShowDialog(true)}
					>
						Delete account
					</button>
				</section>
			</form>
			<BackBtn></BackBtn>
		</Layout>
	);
}
