import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import api, { APIError } from "./api";
import CallbackHandler from "./Callback";
import { Loading } from "./Common";
import Landing from "./Landing";
import Menu from "./Menu";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/discord">
          <CallbackHandler />
        </Route>
        <Route path="/steam">
          <CallbackHandler />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null, loading: true };
  }

  async componentDidMount() {
    try {
      const user = await api.getUser();
      this.setState({ user, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return user ? <Menu user={user} /> : <Landing />;
  }
}
