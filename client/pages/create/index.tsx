import React from "react";

import BackBtn from "@components/_shared/BackBtn";
import GoalForm from "@components/goals/forms/GoalForm";
import Layout from "@components/Layout";
import { useRedirectIfUnauthorized } from "@state/hooks";

export default function Create() {
  useRedirectIfUnauthorized();
  return (
    <Layout>
      <GoalForm goal={null}></GoalForm>
      <BackBtn></BackBtn>
    </Layout>
  );
}
