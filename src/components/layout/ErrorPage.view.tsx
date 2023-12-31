import React from "react";
import {FooterMain} from "./wrapper/footer-main/FooterMain";
import {NavbarMain} from "./wrapper/navbar-main/NavbarMain";
import {Container, Paper} from "@mui/material";

export function ErrorPageView({error}: any) {
  return (<div>
    <NavbarMain/>
    <Container>
      <Paper className={'main-content'}>
        <h1>Fehler {error?.code}</h1>
        <h2>{error?.message}</h2>
      </Paper>
    </Container>
    <FooterMain/>
  </div>);
}
