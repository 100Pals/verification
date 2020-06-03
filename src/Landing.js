import React from "react";

import { DISCORD_CLIENT_ID, IS_LOCAL, LOCATION } from "./constants";

import DiscordLogo from "./media/discord-logo.svg";
import SiteIcon from "./media/achievementhunting.com-logo.png";

import "./Landing.css";

export default function Landing() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: LOCATION + "/verify/discord",
    scope: "identify connections",
    response_type: "code",
    prompt: IS_LOCAL ? "none" : "consent", // Save some time clicking authorize :)
  });

  const oauthURL = "https://discord.com/api/v7/oauth2/authorize?" + params.toString();

  return (
    <>
      <img className="icon" src={SiteIcon} alt="AchievementHunting.com Icon" />
      <p>Sign in with Discord in order to start verifying ownership of your gaming accounts.</p>
      <p>You will be prompted to verify the platforms you play games on.</p>
      <div className="wrap-login">
        <div className="login">
          <img src={DiscordLogo} alt="Discord" />
          <a href={oauthURL}>Sign in with Discord</a>
        </div>
      </div>
    </>
  );
}
