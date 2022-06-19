import React, { useEffect, useState } from "react";
import FormStrField from "../../components/FormStrField";
import Layout from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import profStyles from "../../styles/Profile.module.css";
import globalStyles from "../../styles/Globals.module.css";
import { updateProfile } from "../../state/thunks/auth.thunk";
import DeleteAccountDialog from "../../components/DeleteAccountDialog";
import { useRouter } from "next/router";
import Link from "next/link";

const validDeletionPeriods = [3, 6, 12];
const personalityTypes = ["realistic", "dreamer"];
const themes = ["system", "light", "dark"];

export default function Profile() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const profile = useAppSelector((state) => state.auth.user)?.profile;
	const user = useAppSelector((s) => s.auth.user);
	const [formData, setFormData] = useState({
		nickname: profile?.nickname ? profile.nickname : "",
		monthsToDelete: profile?.monthsToDelete ? profile?.monthsToDelete : 6,
		theme: profile?.theme || "system",
		personality: profile?.personality || "dreamer",
		timezoneOffset: profile?.timezoneOffset ? profile?.timezoneOffset : 0,
	});
	const [showDialog, setShowDialog] = useState(false);

	useEffect(
		function () {
			if (!user) {
				router.replace("/");
			}
		},
		[user, router]
	);

	const handleProfSubmit = (e: any) => {
		e.preventDefault();
		console.log(formData);
		dispatch(
			updateProfile({
				...formData,
			})
		);
	};

	return (
		<Layout>
			<DeleteAccountDialog
				showDialog={showDialog}
				setShowDialog={setShowDialog}
			></DeleteAccountDialog>

			<span style={{ fontSize: "1.05rem" }}>
				<strong>Hi {`${user?.firstname} ${user?.lastname}`}</strong>! Start by
				editing your profile
			</span>
			<form className={profStyles.profForm} onSubmit={handleProfSubmit}>
				<div className={globalStyles.formLine}>
					<label>Nickname</label>
					<input
						type="text"
						value={formData.nickname}
						onChange={(e) =>
							setFormData({
								...formData,
								nickname: e.target.value,
							})
						}
						className={globalStyles.input}
					></input>
				</div>
				<section className={globalStyles.formRow}>
					{/* Personality */}
					<div className={globalStyles.formLine}>
						<label>Your type?</label>
						<select
							onChange={(e) =>
								setFormData({
									...formData,
									personality: e.target.value as "dreamer" | "realistic",
								})
							}
							className={globalStyles.customSelect + " " + globalStyles.input}
							value={formData.personality}
						>
							{personalityTypes.map((item) => (
								<option key={item} value={item} className={globalStyles.input}>
									{item}
								</option>
							))}
						</select>
					</div>

					{/* Theme */}
					<div className={globalStyles.formLine}>
						<label>Theme</label>
						<select
							onChange={(e) =>
								setFormData({
									...formData,
									theme: e.target.value as "system" | "dark" | "light",
								})
							}
							className={globalStyles.customSelect + " " + globalStyles.input}
							value={formData.theme}
						>
							{themes.map((item) => (
								<option key={item} value={item} className={globalStyles.input}>
									{item}
								</option>
							))}
						</select>
					</div>
				</section>

				{/* mtd */}
				<div className={globalStyles.formLine}>
					<label>Delete account if inactive for (months)</label>
					<select
						onChange={(e) =>
							setFormData({
								...formData,
								monthsToDelete: parseInt(e.target.value) as 3 | 6 | 12,
							})
						}
						className={globalStyles.customSelect + " " + globalStyles.input}
						value={formData.monthsToDelete}
					>
						{validDeletionPeriods.map((item) => (
							<option key={item} value={item} className={globalStyles.input}>
								{item}
							</option>
						))}
					</select>
				</div>
				{/* timezone offset */}
				<div className={globalStyles.formLine}>
					<label>Timezone offset (-24, 24)</label>
					<input
						type="number"
						min="-24"
						max="24"
						value={formData.timezoneOffset}
						onChange={(e) =>
							setFormData({
								...formData,
								timezoneOffset: parseInt(e.target.value),
							})
						}
						className={globalStyles.input}
					></input>
				</div>
				<div style={{ display: "flex", gap: "15px" }}>
					<button type="submit" className={globalStyles.primaryBtn}>
						Save
					</button>
					<button
						type="button"
						className={globalStyles.dangerBtn}
						onClick={() => setShowDialog(true)}
					>
						Delete account
					</button>
				</div>
			</form>
			<Link href={"/home"} className={globalStyles.link}>
				Back to home
			</Link>
		</Layout>
	);
}
