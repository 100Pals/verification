import React from "react";

import { LOCATION } from "../constants";

import SteamIcon from "../media/steam-logo-white.png";

import "./Steam.css";

export default function Steam({ data }) {
  const params = new URLSearchParams({
    "openid.mode": "checkid_setup",
    "openid.return_to": LOCATION + "/auth/steam",
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  const url = "https://steamcommunity.com/openid/login?" + params.toString();

  return (
    <>
      <img src={SteamIcon} />
      <div>{data ? data.name : "Not Connected"}</div>
      <a href={url}>{data ? "Change Account" : "Connect Account"}</a>
    </>
  );
}
