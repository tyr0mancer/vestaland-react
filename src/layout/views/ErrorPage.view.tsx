import React from "react";

export function ErrorPageView({error}: any) {
  return (<div>
    <h1>Fehler {error?.code}</h1>
    <h2>{error?.message}</h2>
  </div>);
}
