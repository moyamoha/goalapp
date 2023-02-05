import React from "react";
import { useRouter } from "next/router";
import { RxCaretLeft } from "react-icons/rx";

import globalStyles from "@styles/Globals.module.css";

export default function BackToHomeBtn({ backTo }: { backTo?: string }) {
  const router = useRouter();
  const goBack = () => {
    if (backTo) {
      router.replace(backTo);
    } else {
      router.back();
    }
  };
  return (
    <div className={globalStyles.backBtnCircle} onClick={goBack}>
      <RxCaretLeft size={35} />
    </div>
  );
}
