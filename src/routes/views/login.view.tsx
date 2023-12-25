import React from "react";
import {Container} from "react-bootstrap";
import {NavbarMain} from "../../components/layout/NavbarMain";
import {LoginForm} from "../../components/benutzer/LoginForm";

export function Login() {
  return (<>
    <NavbarMain/>
    <Container className="main-layout">
      <LoginForm/>
    </Container>
  </>);
}
