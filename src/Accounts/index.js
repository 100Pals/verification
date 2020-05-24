import React from "react";

import api from "../api";
import Steam from "./Steam";
import Xbox from "./Xbox";

function LogoutButton({ updateUser }) {
  async function handleClick() {
    await api.logout();
    await updateUser();
  }

  return (
    <button type="button" onClick={handleClick}>
      Log out
    </button>
  );
}

export default function Accounts({ user, updateUser }) {
  return (
    <div>
      Logged in as {user.name}#{user.discriminator} - <LogoutButton updateUser={updateUser} />
      <Steam data={user.connections.steam} />
      <Xbox data={user.connections.xbox} />
    </div>
  );
}
