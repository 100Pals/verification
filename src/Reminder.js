import React from "react";

import PrivacyImage from "./media/privacy.png";

import "./Reminder.css";

function ContinueButton({ reminderSeen }) {
  return (
    <div className="continue">
      <button type="button" onClick={reminderSeen}>
        Continue with your verification
      </button>
    </div>
  );
}

export default function Reminder({ id, reminderSeen }) {
  const url = `https://steamcommunity.com/profiles/${id}/edit/settings`;

  return (
    <>
      <h1>Steam Profile Privacy</h1>
      <p>Your Steam Profile is not Public.</p>
      <p>
        Please visit your{" "}
        <a href={url} target="_blank">
          Steam Privacy Settings
        </a>{" "}
        to make your Steam profile public. It should look like this:
      </p>
      <div className="privacy-wrapper">
        <img
          src={PrivacyImage}
          className="privacy"
          alt="Screenshot of Steam privacy settings with everything set to public"
        />
      </div>
      <ContinueButton reminderSeen={reminderSeen} />
    </>
  );
}
