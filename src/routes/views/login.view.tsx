import React from "react";
import {Container} from "react-bootstrap";
import {MainMenu} from "../../components/layout/Navbar";
import {LoginForm} from "../../components/benutzer/LoginForm";

export function Login() {
  return (<>
    <MainMenu/>
    <Container className="main-layout">
      <LoginForm/>
    </Container>
  </>);
}
