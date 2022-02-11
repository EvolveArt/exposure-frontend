import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CollectionPage from "./pages/CollectionPage";

export const App = () => (
	<ChakraProvider theme={theme}>
		<Router>
			<Switch>
				<Route path='/' component={LandingPage} />
				<Route path='/collection' component={CollectionPage} />
			</Switch>
		</Router>
	</ChakraProvider>
);
