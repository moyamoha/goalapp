import Link from "next/link";
import React from "react";

import AuthLayout from "@components/auth/AuthLayout";
import SignupForm from "@components/auth/SignupForm";

import globalStyles from "@styles/Globals.module.css";

export default function Signup() {
  return (
    <AuthLayout>
      <SignupForm></SignupForm>
      <p>
        Already have an account?{" "}
        <Link href={"/login"}>
          <a className={globalStyles.link}>login</a>
        </Link>
      </p>
    </AuthLayout>
  );
}
