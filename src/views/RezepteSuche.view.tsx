import React from "react";
import {Container} from "react-bootstrap";

import {MainMenu} from "../components/layout/Navbar";
import {RezeptSuche} from "../components/rezept/RezeptSuche";
import {RezeptSucheAusgabe} from "../components/rezept/RezeptSucheAusgabe";

export function RezepteSucheView() {
  return (<>
    <MainMenu/>
    <Container>
      <RezeptSuche/>
      <RezeptSucheAusgabe/>
    </Container>
  </>);
}
