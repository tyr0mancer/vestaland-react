import React from "react";
import {Container} from "react-bootstrap";

import {NavbarMain} from "../../components/layout/NavbarMain";
import {EinkaufsListe} from "../../components/einkaufsliste/EinkaufsListe";
import {RestrictedArea} from "../../services/auth/RestricedArea";

export function EinkaufsListeView() {
  return (<>
    <NavbarMain title="Einkaufsliste"/>
    <Container className="main-layout">
      <RestrictedArea>
        <EinkaufsListe/>
      </RestrictedArea>
    </Container>
  </>);
}
