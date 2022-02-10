import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CollectionPage from "./pages/CollectionPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
