import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/user.page.component";
import Home from "./components/home.page.component";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const App = () => (
  <Grommet theme={theme}>
    <Router>
      <Route exact path="/user/:id" component={User} />
      <Route exact path="/" component={Home} />
    </Router>
  </Grommet>
);

export default App;
