import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import api, { APIError } from "./api";
import { AppFailure, Loading } from "./Common";

class CallbackHandler extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, error: null };
  }

  async componentDidMount() {
    try {
      await this.processData();
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ loading: false });
  }

  async processData() {
    const path = this.props.location.pathname;
    const search = new URLSearchParams(this.props.location.search);

    // The Discord and Xbox auth flow can be cancelled
    // In this case the user is redirected back to /app
    switch (path) {
      case "/auth/discord": {
        const code = search.get("code");

        if (code) {
          await api.login(code);
        }
        break;
      }
      case "/auth/steam": {
        await api.createSteamConnection(Object.fromEntries(search));
        break;
      }
      case "/auth/xbox": {
        const code = search.get("code");

        if (code) {
          await api.createXboxConnection(code);
        }
        break;
      }
      default: {
        throw new Error("Invalid auth callback URL.");
      }
    }
  }

  render() {
    const { loading, error } = this.state;

    if (error) {
      return <AppFailure error={error} />;
    }

    return loading ? <Loading /> : <Redirect to="/home" />;
  }
}

export default withRouter(CallbackHandler);
