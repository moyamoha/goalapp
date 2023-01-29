import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import globalStyles from "@styles/Globals.module.css";

type PasswordFieldPropsType = {
  labelText: string;
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function PasswordField({
  labelText,
  id,
  value,
  setValue,
}: PasswordFieldPropsType) {
  const [show, setShow] = useState(false);

  return (
    <div className={globalStyles.formLine}>
      <label htmlFor={id}>{labelText}</label>
      <div className={globalStyles.passField}>
        <input
          className={globalStyles.input}
          value={value}
          type={show ? "text" : "password"}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          required
        ></input>
        {show ? (
          <AiOutlineEye
            onClick={() => setShow(!show)}
            size={24}
            className={globalStyles.eyeIcon}
          />
        ) : (
          <AiOutlineEyeInvisible
            size={24}
            onClick={() => setShow(!show)}
            className={globalStyles.eyeIcon}
          />
        )}
      </div>
    </div>
  );
}
