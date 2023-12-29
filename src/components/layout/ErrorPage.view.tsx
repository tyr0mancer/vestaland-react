import React from "react";
import {NavbarMain} from "./wrapper/NavBarMain";
import {Container} from "react-bootstrap";
import {FooterMain} from "./wrapper/FooterMain";

export function ErrorPageView({error}: any) {
  return (<div>
    <NavbarMain/>
    <Container className="main-layout">
      <h1>Fehler {error?.code}</h1>
      <h2>{error?.message}</h2>
    </Container>
    <FooterMain/>
  </div>);
}
