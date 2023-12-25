import React from "react";
import {Container} from "react-bootstrap";

import {NavbarMain} from "../../components/layout/NavbarMain";

export function ErrorPageView({error}: any) {
  return (<>
    <NavbarMain title="Fehler"/>
    <Container className="main-layout">
      <h1>Fehler {error?.code}</h1>
      <h2>{error?.message}</h2>
    </Container>
  </>);
}
