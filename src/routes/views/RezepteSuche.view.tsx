import React from "react";
import {Container} from "react-bootstrap";

import {NavbarMain} from "../../components/layout/NavbarMain";
import {RezeptSuche} from "../../components/rezept/RezeptSuche";
import {RezeptSucheAusgabe} from "../../components/rezept/RezeptSucheAusgabe";

export function RezepteSucheView() {
  return (<>
    <NavbarMain title="Rezepte Suchen"/>
    <Container className="main-layout">
      <RezeptSuche/>
      <RezeptSucheAusgabe/>
    </Container>
  </>);
}
