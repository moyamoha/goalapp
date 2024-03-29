import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import { login } from "@state/thunks/auth.thunk";
import PasswordInput from "../_shared/form-fields/PasswordField";
import FormStrField from "../_shared/form-fields/FormStrField";
import ErrorAlert from "../ErrorAlert";

import authStyles from "@styles/AuthLayout.module.css";
import globalStyles from "@styles/Globals.module.css";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const authError = useAppSelector((s) => s.auth.authError);
  const isLoggingIn = useAppSelector((s) => s.auth.isLoggingIn);

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
      <FormStrField
        id="email"
        label="Email"
        value={email}
        type="email"
        setValue={setEmail}
        required={true}
      ></FormStrField>
      <PasswordInput
        labelText="Password"
        id="password"
        value={password}
        setValue={setPassword}
      ></PasswordInput>
      {authError !== "" ? <ErrorAlert message={authError}></ErrorAlert> : <></>}
      <button className={globalStyles.primaryBtn} type="submit">
        {isLoggingIn ? "Checking login credentials..." : "Login"}
      </button>
    </form>
  );
}
