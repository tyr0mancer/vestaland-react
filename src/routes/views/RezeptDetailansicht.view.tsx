import React from "react";
import {Container} from "react-bootstrap";
import {MainMenu} from "../../components/layout/Navbar";
import {RezeptDetail} from "../../components/rezept/RezeptDetail";

export function RezeptDetailView() {

  return (<>
    <MainMenu title="Rezepte Suchen"/>
    <Container className="main-layout">
      <RezeptDetail/>
    </Container>
  </>)

}
