import React from "react";

import "./common.css";

export function Loading() {
  return <h1 className="status">Loading ...</h1>;
}

export function AppFailure({ error }) {
  const _default = "Something unexpected went wrong. Try again later.";
  return <h1 className="status error">{error.message ?? _default}</h1>;
}
