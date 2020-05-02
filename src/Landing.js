import React from "react";

import { CLIENT_ID, LOCATION } from "./constants";

export default function Landing() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: LOCATION + "/discord",
    scope: "identify connections",
    response_type: "code",
  });

  const oauthURL = "https://discordapp.com/oauth2/authorize?" + params.toString();

  return (
    <>
      <h1>Verify Gaming Profiles</h1>
      <p>
        In order to start verifying ownership of your gaming profiles please login with your Discord
        Account below.
      </p>
      <a href={oauthURL}>Login with Discord</a>
    </>
  );
}
