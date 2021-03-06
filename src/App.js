import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Accounts from "./Accounts/index";
import api from "./api";
import CallbackHandler from "./Callback";
import { Loading } from "./Common";
import Landing from "./Landing";

import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/verify">
          <MenuBase />
        </Route>
        <Route path="/verify/*">
          <CallbackHandler />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

class MenuBase extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null, loading: true };
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    await this.updateUser();
  }

  async updateUser() {
    this.setState({ user: null, loading: true });

    try {
      const user = await api.getUser();
      this.setState({ user, loading: false });
    } catch {
      // Ensure the user is completely
      // Logged out, else logging in might error
      api.removeToken();
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="menu">
        <h1>Account Verification</h1>
        {user ? <Accounts user={user} updateUser={this.updateUser} /> : <Landing />}
      </div>
    );
  }
}
