import React from "react";
import {Container} from "react-bootstrap";

import {MainMenu} from "../../components/layout/Navbar";
import {EinkaufsListe} from "../../components/einkaufsliste/EinkaufsListe";
import {RestrictedArea} from "../../services/auth/RestricedArea";

export function EinkaufsListeView() {
  return (<>
    <MainMenu title="Einkaufsliste"/>
    <Container className="main-layout">
      <RestrictedArea>
        <EinkaufsListe/>
      </RestrictedArea>
    </Container>
  </>);
}
