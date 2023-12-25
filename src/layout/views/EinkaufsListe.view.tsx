import React from "react";
import {EinkaufsListe} from "../../components/einkaufsliste/EinkaufsListe";
import {RestrictedArea} from "../../services/auth/RestricedArea";

export function EinkaufsListeView() {
  return (<RestrictedArea>
    <EinkaufsListe/>
  </RestrictedArea>);
}
