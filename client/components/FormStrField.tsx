import React from "react";
import globalStyles from "../styles/Globals.module.css";

type FormStrFieldPropsType<T> = {
	type: string;
	id: string;
	label: string;
	value: T;
	required?: boolean;
	setValue: React.Dispatch<React.SetStateAction<T>>;
};

export default function FormStrField({
	type,
	id,
	label,
	value,
	setValue,
	required,
}: FormStrFieldPropsType<string>) {
	return (
		<div className={globalStyles.formLine}>
			<label htmlFor={id}>{label}</label>
			<input
				className={globalStyles.input}
				type={type}
				id={id}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				required={required}
			></input>
		</div>
	);
}
