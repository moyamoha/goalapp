import React, { useState } from "react";
import authStyles from "../styles/AuthLayout.module.css";
import globalStyles from "../styles/Globals.module.css";
import { useAppDispatch } from "../state/hooks";
import { login, registerUser } from "../state/thunks/auth.thunk";
import PasswordInput from "./PasswordField";
import FormStrField from "./FormStrField";
import PasswordField from "./PasswordField";

export default function SignupForm() {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [dob, setDob] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			registerUser({
				email: email,
				firstname: firstname,
				lastname: lastname,
				password: password1,
				dateOfBirth: dob,
			})
		);
	};

	return (
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
			<FormStrField
				id="dob"
				label="Date of birth"
				required
				value={dob}
				setValue={setDob}
				type="date"
			></FormStrField>
			<section className={globalStyles.formRow}>
				<PasswordField
					id="pass1"
					labelText="Password"
					value={password1}
					setValue={setPassword1}
				></PasswordField>
				<PasswordField
					id="pass2"
					labelText="Repeat password"
					value={password2}
					setValue={setPassword2}
				></PasswordField>
			</section>
			<button type="submit" className={globalStyles.primaryBtn}>
				Signup
			</button>
		</form>
	);
}
