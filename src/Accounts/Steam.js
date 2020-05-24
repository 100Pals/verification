import React from "react";

import { LOCATION } from "../constants";

export default function Steam({ data }) {
  const params = new URLSearchParams({
    "openid.mode": "checkid_setup",
    "openid.return_to": LOCATION + "/auth/steam",
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  const signin = "https://steamcommunity.com/openid/login?" + params.toString();

  if (!data) {
    return (
      <p>
        <a href={signin}>Sign in with Steam.</a>
      </p>
    );
  }

  const url = "https://steamcommunity.com/profiles/" + data.id;

  return (
    <div>
      Connected Steam account:{" "}
      <a href={url} target="_blank">
        {data.name}
      </a>
      <a href={signin}>Connect another account</a>
    </div>
  );
}
