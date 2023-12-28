import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import login from '../../assets/images/login.png';

import {useAuth} from "../../services/auth/AuthProvider";


export function NavbarMain({title}: { title?: string }) {
  const {isAuthorized, authInfo} = useAuth()

  return (<>
    <Navbar expand="lg" sticky="top" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><img src={logo} alt="Vestaland Logo" style={{height: 64}}/></Navbar.Brand>
        <Nav className="navbar-text-collapsed">
          <h4><b>{title}</b></h4>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/rezepte">Rezepte</Nav.Link>
            {isAuthorized() && <>
                <Nav.Link as={NavLink} to="/einkaufsliste">Einkaufsliste</Nav.Link>
                <Nav.Link as={NavLink} to="/plan">Essensplan</Nav.Link>
                <Nav.Link as={NavLink} to="/vorrat">Vorrat</Nav.Link>
            </>}
          </Nav>
          <hr/>

          {isAuthorized() && <>
              <Nav>
                  <Nav.Link as={NavLink} to="/admin">Adminbereich</Nav.Link>
              </Nav>
              <hr/>
          </>}

          <Navbar.Text>
            <Nav>
              {isAuthorized() && <Nav.Link as={NavLink} to="/user">Hier: {authInfo?.name}</Nav.Link>}
              {!isAuthorized() &&
                  <Nav.Link as={NavLink} to="/login"><img src={login} height={24} alt={"login"}/> anmelden</Nav.Link>}
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}
