import React from "react";

import { DISCORD_CLIENT_ID, IS_LOCAL, LOCATION } from "./constants";

import SiteIcon from "./media/100pals-128.png";

export default function Landing() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: LOCATION + "/auth/discord",
    scope: "identify connections",
    response_type: "code",
    prompt: IS_LOCAL ? "none" : "consent", // Save some time clicking authorize :)
  });

  const oauthURL = "https://discord.com/api/v7/oauth2/authorize?" + params.toString();

  return (
    <>
      <img src={SiteIcon} alt="AchievementHunting.com Icon" />
      <h2></h2>
      <p>Connect your gaming accounts to get verified on the Discord Server</p>
      <a href={oauthURL}>Login with Discord</a>
    </>
  );
}
