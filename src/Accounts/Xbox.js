import React from "react";

import { LOCATION, MICROSOFT_CLIENT_ID } from "../constants";

import XboxIcon from "../media/xbox-logo-white.png";

import "./Xbox.css";

export default function Xbox({ data }) {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: LOCATION + "/verify/xbox",
    scope: "xboxlive.signin offline_access",
    response_mode: "query",
    prompt: "consent",
  });

  const cls = data ? "connect" : "connect bold";
  const name = data ? (
    <a
      className="account"
      href={`https://account.xbox.com/en-us/profile?gamertag=${data.name}`}
      target="_blank"
    >
      {data.name}
    </a>
  ) : (
    "Not Connected"
  );

  const url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + params.toString();

  return (
    <>
      <img title="Xbox" src={XboxIcon} />
      <div>{name}</div>
      <a className={cls} href={url}>
        {data ? "Change Account" : "Connect Account"}
      </a>
    </>
  );
}
