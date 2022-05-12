import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import CollectionPage from "./pages/CollectionPage";
import AddArtist from "pages/AddArtist";
import AddCollection from "pages/AddCollection";
import Profile from "pages/Profile";
import Artists from "pages/Artists";
import QA from "pages/Q&A";
import ArtistPage from "pages/ArtistPage";
import ExploreCollection from "pages/ExploreCollection";
import Dashboard from "pages/Dashboard";
import ListArtists from "pages/ListArtists";
import ListCollections from "pages/ListCollections";
import ListMints from "pages/ListMints";
import NotFound from "components/NotFound";
import ProtectedRoute from "components/ProtectedRoute";
import Search from "pages/Search/index.jsx";
import Email from "pages/Email/index.jsx";
import WaitingPage from "pages/WaitingPage";

export const App = () => (
	<ChakraProvider theme={theme}>
		<Router>
			<Switch>
				<Route exact path='/landing' component={LandingPage} />
				<Route exact path='/collection/:dropId' component={CollectionPage} />
				<Route exact path='/artists' component={Artists} />
				<ProtectedRoute exact path='/addartist' component={AddArtist} />
				<ProtectedRoute exact path='/addcollection' component={AddCollection} />
				<Route exact path='/profile/:uid' component={Profile} />
				<Route exact path='/HelpCenter' component={QA} />
				<Route exact path='/search' component={Search} />
				<Route exact path='/exploreCollection' component={ExploreCollection} />
				<Route exact path='/artist/:address' component={ArtistPage} />
				<Route exact path='/' component={WaitingPage} />
				<Route exact path='/email' component={Email} />
				<ProtectedRoute exact path='/dashboard' component={Dashboard} />
				<ProtectedRoute exact path='/listartists' component={ListArtists} />
				<ProtectedRoute
					exact
					path='/listcollections'
					component={ListCollections}
				/>
				<ProtectedRoute exact path='/listmints' component={ListMints} />
				<Route path='/404' component={NotFound} />
				<Route path='*'>
					<Redirect to='/404' />
				</Route>
			</Switch>
		</Router>
	</ChakraProvider>
);
