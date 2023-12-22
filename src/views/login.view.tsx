import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import {MainMenu} from "../components/layout/Navbar";
import {useAuth} from "../services/contexts/AuthProvider";
import {useNavigate} from "react-router-dom";

export function Login() {
  const {login} = useAuth()
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault()
    login('testToken')
    navigate('/user');
  }

  return (<>
    <MainMenu/>
    <Container className="main-layout">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Adresse</Form.Label>
          <Form.Control type="email" placeholder="Email eingeben"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Passwort</Form.Label>
          <Form.Control type="password" placeholder="Passwort"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  </>);
}
