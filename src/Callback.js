import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import api, { APIError } from "./api";
import { Loading } from "./Common";

class CallbackHandler extends Component {
  constructor(props) {
    super(props);

    this.state = { finished: false };
  }

  async componentDidMount() {
    // One of "discord", "steam"
    const path = this.props.match.path.slice(1);
    const search = new URLSearchParams(this.props.location.search);

    if (path === "discord") {
      await api.login(search.get("code"));
    } else if (path === "steam") {
      const data = { service: "steam", ...Object.fromEntries(search) };
      await api.createConnection(data);
    } else {
      throw new Error(`Unhandled callback "${path}".`);
    }

    this.setState({ finished: true });
  }

  render() {
    const finished = this.state.finished;
    return finished ? <Redirect to="/" /> : <Loading />;
  }
}

export default withRouter(CallbackHandler);
