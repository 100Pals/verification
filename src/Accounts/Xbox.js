import React from "react";

import { LOCATION, MICROSOFT_CLIENT_ID } from "../constants";

export default function Xbox({ data }) {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: LOCATION + "/auth/xbox",
    scope: "xboxlive.signin offline_access",
    response_mode: "query",
    prompt: "consent",
  });

  const signin =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + params.toString();

  if (!data) {
    return (
      <p>
        <a href={signin}>Sign in with Xbox</a>
      </p>
    );
  }

  const tag = encodeURIComponent(data.name);
  const url = "https://account.xbox.com/en-us/profile?gamertag=" + tag;

  return (
    <div>
      Connected Xbox account:{" "}
      <a href={url} target="_blank">
        {data.name}
      </a>
      <a href={signin}>Connect another account</a>
    </div>
  );
}
