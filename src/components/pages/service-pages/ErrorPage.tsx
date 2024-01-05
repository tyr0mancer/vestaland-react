import React from "react";

export function ErrorPage({error}: any) {
  return (<div>
    <h1>Fehler Code {error?.code}</h1>
    <h2>{error?.message}</h2>
  </div>);
}
