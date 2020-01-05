import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventPage from "./pages/Events";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect form="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/bookings" component={BookingsPage} />
          <Route path="/events" component={EventPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
