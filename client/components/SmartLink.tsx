import Link from "next/link";
import React from "react";
import { useAppSelector } from "../state/hooks";

type SmartLinkPropsType = {
	href: string;
	className: string;
	text: string;
	fallback?: string;
};

export default function SmartLink({
	href,
	className,
	text,
	fallback,
}: SmartLinkPropsType) {
	const user = useAppSelector((s) => s.auth.user);
	return user ? (
		<Link href={href}>
			<a className={className}>{text}</a>
		</Link>
	) : (
		<Link href={fallback ? fallback : href}>
			<a className={className}>{text}</a>
		</Link>
	);
}
