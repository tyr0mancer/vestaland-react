import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Nav} from "react-bootstrap";

import {MainMenu} from "../components/layout/Navbar";
import {Startseite} from "../components/startseite/Startseite";

export function StartseiteView() {

  return (<>
    <div className="page-container">
      <div className="content-wrap">
        <MainMenu title="Vestaland"/>
        <Container className="main-layout">
          <Startseite/>
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

