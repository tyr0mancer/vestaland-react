import React from "react";
import {BenutzerInfo} from "../../components/benutzer/BenuzterInfo";
import {RestrictedArea} from "../../services/auth/RestricedArea";

export function BenutzerView() {
  return (<RestrictedArea>
    <BenutzerInfo/>
  </RestrictedArea>);
}
