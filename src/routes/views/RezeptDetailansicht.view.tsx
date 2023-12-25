import React from "react";
import {Container} from "react-bootstrap";
import {NavbarMain} from "../../components/layout/NavbarMain";
import {RezeptDetail} from "../../components/rezept/RezeptDetail";

export function RezeptDetailView() {

  return (<>
    <NavbarMain title="Rezepte Suchen"/>
    <Container className="main-layout">
      <RezeptDetail/>
    </Container>
  </>)

}
