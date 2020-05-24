import React from "react";

import { LOCATION, MICROSOFT_CLIENT_ID } from "../constants";

import XboxIcon from "../media/xbox-logo-white.png";

import "./Xbox.css";

export default function Xbox({ data }) {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: LOCATION + "/auth/xbox",
    scope: "xboxlive.signin offline_access",
    response_mode: "query",
    prompt: "consent",
  });

  const url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + params.toString();
  return (
    <>
      <img src={XboxIcon} />
      <div>{data ? data.name : "Not Connected"}</div>
      <a href={url}>{data ? "Change Account" : "Connect Account"}</a>
    </>
  );
}
