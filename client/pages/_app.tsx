import axios from "axios";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../state/store";
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
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
