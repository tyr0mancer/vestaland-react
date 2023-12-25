import React from 'react';

import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {FaCirclePlus} from "react-icons/fa6";

export function NavbarAdmin() {

  return (<>
    <Navbar expand="lg" sticky="top" className="navbar-second">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={'/admin/lebensmittel'}>Lebensmittel</Nav.Link>
            <Nav.Link as={NavLink} to={'/admin/hilfsmittel'}>Hilfsmittel</Nav.Link>
            <Nav.Link as={NavLink} to={'/admin/user'}>Benutzer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          <Button variant="primary" size="sm">
            <FaCirclePlus />
          </Button>
        </Navbar.Text>
      </Container>
    </Navbar>
  </>)
}
