import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CollectionPage from "./pages/CollectionPage";
import AddArtist from "pages/AddArtist";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/collection" component={CollectionPage} />
        <Route exact path="/addartist" component={AddArtist} />
      </Switch>
    </Router>
  </ChakraProvider>
);
