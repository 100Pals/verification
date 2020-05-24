import React from "react";

import api from "../api";
import Avatar from "./Avatar";
import Steam from "./Steam";
import Xbox from "./Xbox";

import "./index.css";

function LogoutButton({ updateUser }) {
  async function handleClick() {
    await api.logout();
    await updateUser();
  }

  return (
    <button className="logout" type="button" onClick={handleClick}>
      Log out
    </button>
  );
}

export default function Accounts({ user, updateUser }) {
  return (
    <div>
      <Avatar user={user} />
      <div className="user">
        Logged in as {user.name}#{user.discriminator} – <LogoutButton updateUser={updateUser} />
      </div>
      <div className="divider" />
      <div className="platform steam">
        <Steam data={user.connections.steam} />
      </div>
      <div className="platform xbox">
        <Xbox data={user.connections.xbox} />
      </div>
      <h3>Is your platform not available?</h3>
      <p>Get in contact with 100Pals Staff and let us know!</p>
    </div>
  );
}