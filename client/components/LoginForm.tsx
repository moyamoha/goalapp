import React, { useState } from "react";
import authStyles from "../styles/AuthLayout.module.css";
import globalStyles from "../styles/Globals.module.css";
import { useAppDispatch } from "../state/hooks";
import { login } from "../state/thunks/auth.thunk";
import PasswordInput from "./PasswordField";

export default function LoginForm() {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			login({
				email: email,
				password: password,
			})
		);
	};

	return (
		<form className={authStyles.authForm} onSubmit={handleSubmit}>
			<div className={globalStyles.formLine}>
				<label htmlFor="email">Email</label>
				<input
					className={globalStyles.input}
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				></input>
			</div>
			<PasswordInput
				labelText="Password"
				id="password"
				value={password}
				setValue={setPassword}
			></PasswordInput>
			<button className={globalStyles.primaryBtn} type="submit">
				Login
			</button>
		</form>
	);
}
