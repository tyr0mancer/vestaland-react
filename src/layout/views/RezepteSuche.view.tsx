import React from "react";
import {RezeptSuche} from "../../components/rezept/RezeptSuche";
import {RezeptSucheAusgabe} from "../../components/rezept/RezeptSucheAusgabe";

export function RezepteSucheView() {
  return (<>
      <RezeptSuche/>
      <RezeptSucheAusgabe/>
  </>);
}
