import React from "react";
import {Container} from "react-bootstrap";

import {MainMenu} from "../components/layout/Navbar";
import {EinkaufsListe} from "../components/einkaufsliste/EinkaufsListe";

export function EinkaufsListeView() {
  return (<>
    <MainMenu title="Einkaufsliste"/>
    <Container className="main-layout">
      <EinkaufsListe/>
    </Container>
  </>);
}
