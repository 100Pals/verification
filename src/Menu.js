import React from "react";

import { LOCATION } from "./constants";

function getSteamURL() {
  const params = new URLSearchParams({
    "openid.mode": "checkid_setup",
    "openid.return_to": LOCATION + "/steam",
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  return "https://steamcommunity.com/openid/login?" + params.toString();
}

export default function Menu({ user }) {
  return (
    <>
      <div>Menu showing all [not yet] connected accounts.</div>
      <p>
        Current user: {user.name}#{user.discriminator}
      </p>
      <a href={getSteamURL()}>Steam login!</a>
    </>
  );
}
