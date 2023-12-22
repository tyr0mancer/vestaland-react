import React from "react";
import {Container} from "react-bootstrap";

import {MainMenu} from "../components/layout/Navbar";
import {BenutzerInfo} from "../components/benutzer/BenuzterInfo";

export function BenutzerView() {
  return (<>
    <MainMenu/>
    <Container className="main-layout">
      <BenutzerInfo/>
    </Container>
  </>);
}
