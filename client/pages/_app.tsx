import axios from "axios";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store, { persistor } from "../state/store";
import { PersistGate } from "redux-persist/integration/react";

import "@styles/globals.css";

axios.defaults.baseURL = "https://goal-tracker-yahya.herokuapp.com/";
axios.interceptors.request.use((request) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		request.headers = {
			Authorization: `Bearer ${token}`,
		};
	}
	return request;
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
