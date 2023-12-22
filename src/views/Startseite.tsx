import React from "react";
import {MainMenu} from "../components/layout/Navbar";
import {Container} from "react-bootstrap";

export function Startseite() {

  return (<>
    <MainMenu/>
    <Container className="main-layout">
      <h1>Startseite</h1>
      <ul>
        <li>Aktuelles Rezept und Status</li>
      </ul>
    </Container>

  </>);
}

