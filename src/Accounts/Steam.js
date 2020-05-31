import React from "react";

import { LOCATION } from "../constants";

import SteamIcon from "../media/steam-logo-white.png";

import "./Steam.css";

export default function Steam({ data }) {
  const params = new URLSearchParams({
    "openid.mode": "checkid_setup",
    "openid.return_to": LOCATION + "/verify/steam",
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  const cls = data ? "connect" : "connect bold";
  const name = data ? (
    <a className="account" href={`https://steamcommunity.com/profiles/${data.id}`} target="_blank">
      {data.name}
    </a>
  ) : (
    "Not Connected"
  );

  const url = "https://steamcommunity.com/openid/login?" + params.toString();

  return (
    <>
      <img title="Steam" src={SteamIcon} />
      <div>{name}</div>
      <a className={cls} href={url}>
        {data ? "Change Account" : "Connect Account"}
      </a>
    </>
  );
}
