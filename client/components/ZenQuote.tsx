import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";

import qStyles from "@styles/Quotes.module.css";

export default function ZenQuote() {
	const quotes = useAppSelector((s) => s.quotes);
	const [randomInd, setRandomInd] = useState(0);

	const generateRandomInd = useCallback(() => {
		const randomNum = quotes.quotes
			? Math.floor(Math.random() * quotes.quotes?.length - 1)
			: 0;
		setRandomInd(randomNum as number);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(function () {
		generateRandomInd();
		const interval = setInterval(() => {
			generateRandomInd();
		}, 15000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return quotes.quotes ? (
		<div className={qStyles.quoteContainer}>
			<p>
				{quotes.quotes[randomInd].text}{" "}
				<i style={{ color: "yellow" }}>{quotes.quotes[randomInd].author}</i>
			</p>
		</div>
	) : (
		<></>
	);
}
