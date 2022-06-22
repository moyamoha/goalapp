import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import Intro from "@components/Intro";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { getQuotes } from "state/thunks/quotes.thunk";

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const quotes = useAppSelector((s) => s.quotes).quotes;
	useEffect(() => {
		if (!quotes) {
			dispatch(getQuotes());
		}
	}, [quotes, dispatch]);
	return (
		<div>
			<Head>
				<title>Goal app</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Intro></Intro>
			</Layout>
		</div>
	);
};

export default Home;
