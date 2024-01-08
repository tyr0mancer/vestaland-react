import React from "react";

/**
 * TS Doc Info
 * @component ErrorScreen
 */
export function ErrorScreen({error}: any) {
  return (<div>
    <h1>Fehler {error?.code}</h1>
    <h2>{error?.message}</h2>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>)
}
