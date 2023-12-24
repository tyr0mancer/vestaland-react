import React from "react";
import {Container} from "react-bootstrap";

import {MainMenu} from "../../components/layout/Navbar";

export function ErrorPageView({error}: any) {
  return (<>
    <MainMenu title="Fehler"/>
    <Container className="main-layout">
      <h1>Fehler {error?.code}</h1>
      <h2>{error?.message}</h2>
    </Container>
  </>);
}
