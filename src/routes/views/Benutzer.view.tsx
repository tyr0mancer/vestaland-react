import React from "react";
import {Container} from "react-bootstrap";

import {NavbarMain} from "../../components/layout/NavbarMain";
import {BenutzerInfo} from "../../components/benutzer/BenuzterInfo";

export function BenutzerView() {
  return (<>
    <NavbarMain title="Benutzer"/>
    <Container className="main-layout">
      <BenutzerInfo/>
    </Container>
  </>);
}
