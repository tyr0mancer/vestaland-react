import React from "react";
import {Container} from "react-bootstrap";
import {FooterMain} from "./wrapper/FooterMain";
import {NavbarMain} from "./wrapper/NavbarMain";

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
