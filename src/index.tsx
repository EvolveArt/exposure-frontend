import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./stores/reduxStore";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "./constants";
import Web3ReactManager from "components/Web3ReactManager";
import getLibrary from "./utils/getLibrary";
import { CookiesProvider } from "react-cookie";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

ReactDOM.render(
	<Provider store={store}>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ProviderNetwork getLibrary={getLibrary}>
				<Web3ReactManager>
					<CookiesProvider>
						<ColorModeScript />
						<App />
					</CookiesProvider>
				</Web3ReactManager>
			</Web3ProviderNetwork>
		</Web3ReactProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
