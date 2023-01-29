import React, { useEffect } from "react";
import Link from "next/link";

import AuthLayout from "@components/auth/AuthLayout";
import LoginForm from "@components/auth/LoginForm";

import globalStyles from "@styles/Globals.module.css";

export default function Index() {
  return (
    <AuthLayout>
      <LoginForm></LoginForm>
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <a className={globalStyles.link}>Create one</a>
        </Link>
      </p>
    </AuthLayout>
  );
}
