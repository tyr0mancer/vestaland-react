import {MainMenu} from "../components/layout/Navbar";
import {Container} from "react-bootstrap";
import React from "react";

export function ImpressumView() {
  return (<>
    <MainMenu title="Vestaland"/>
    <Container className="main-layout">
      <h1>Anbieterkennung</h1>
      <p>Icons: <a target="_blank" href="https://www.flaticon.com/authors/eucalyp">flaticon.com/authors/eucalyp</a></p>
      <p>Logo und weitere Bilder: Chad Peter</p>
      <p>Rezepte: geistes Eigentum vom Erfinder</p>
    </Container>

  </>)
}
