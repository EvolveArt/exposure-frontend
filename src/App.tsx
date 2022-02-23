import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CollectionPage from "./pages/CollectionPage";
import AddArtist from "pages/AddArtist";
import AddCollection from "pages/AddCollection";
import Profile from "pages/Profile";
import Artists from "pages/Artists";
import QA from "pages/Q&A";
import Search from "pages/Search";
import ExploreCollection from "pages/ExploreCollection";

export const App = () => (
	<ChakraProvider theme={theme}>
		<Router>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route
					exact
					path='/collection/:collection'
					component={CollectionPage}
				/>
				<Route exact path='/artists' component={Artists} />
				<Route exact path='/addartist' component={AddArtist} />
				<Route exact path='/addcollection' component={AddCollection} />
				<Route exact path='/profile/:uid' component={Profile} />
				<Route exact path='/QA' component={QA} />
				<Route exact path='/search' component={Search} />
				<Route exact path='/exploreCollection' component={ExploreCollection} />
			</Switch>
		</Router>
	</ChakraProvider>
);
