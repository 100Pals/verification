import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import api, { APIError } from "./api";
import { AppFailure, Loading } from "./Common";
import Reminder from "./Reminder";

class CallbackHandler extends Component {
  constructor(props) {
    super(props);

    this.reminderSeen = this.reminderSeen.bind(this);
    this.state = { loading: true, error: null, steam: null };
  }

  async componentDidMount() {
    try {
      await this.processData();
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ loading: false });
  }

  async reminderSeen() {
    this.setState({ steam: null });
  }

  async processData() {
    const path = this.props.location.pathname;
    const search = new URLSearchParams(this.props.location.search);

    // The Discord and Xbox auth flow can be cancelled
    // In this case the user is redirected back to /verify
    switch (path) {
      case "/verify/discord": {
        const code = search.get("code");

        if (code) {
          await api.login(code);
        }
        break;
      }
      case "/verify/steam": {
        const data = await api.createSteamConnection(Object.fromEntries(search));
        this.setState({ steam: data });
        break;
      }
      case "/verify/xbox": {
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
    const { loading, error, steam } = this.state;

    if (error) {
      return <AppFailure error={error} />;
    }

    if (steam && steam.status === "private") {
      return <Reminder id={steam.id} reminderSeen={this.reminderSeen} />;
    }

    return loading ? <Loading /> : <Redirect to="/verify" />;
  }
}

export default withRouter(CallbackHandler);
