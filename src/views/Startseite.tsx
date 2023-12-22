import React from "react";
import {MainMenu} from "../components/layout/Navbar";
import {Container, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export function Startseite() {

  return (<>
    <div className="page-container">
      <div className="content-wrap">

        <MainMenu title="Vestaland"/>
        <Container className="main-layout">
          <h1>Startseite</h1>
          <ul>
            <li>Aktuelles Rezept und Status</li>
          </ul>
        </Container>

      </div>
      <footer className="footer">
        <Container style={{textAlign: "center"}}>
          <Nav.Link as={NavLink} to="/impressum">Impressum</Nav.Link>
        </Container>
      </footer>
    </div>
  </>);
}

