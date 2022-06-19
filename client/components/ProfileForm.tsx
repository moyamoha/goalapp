import React from "react";

import profStyles from "../styles/Profile.module.css";

export default function ProfileForm() {
	return (
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
	);
}
