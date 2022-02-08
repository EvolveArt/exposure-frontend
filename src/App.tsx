import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export const App = () => (
	<ChakraProvider theme={theme}>
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
			</Routes>
		</Router>
	</ChakraProvider>
);
