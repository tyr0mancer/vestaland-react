import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {useAuth} from "../../services/contexts/AuthProvider";


export function MainMenu({title}: { title?: string }) {
  const {authToken} = useAuth()
  const loggedIn = authToken !== null

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
            <Nav.Link as={NavLink} to="/einkaufsliste">Einkaufsliste</Nav.Link>
            <Nav.Link as={NavLink} to="/vorrat">Vorrat</Nav.Link>
            {loggedIn && <><Nav.Link as={NavLink} to="/lebensmittel">Lebensmittel</Nav.Link></>}
          </Nav>
          <hr/>

          <Navbar.Text>
            {loggedIn && <>
                Angemeldet als: <Link to="/user">Mark Otto</Link>
            </>}
            {!loggedIn && <>
                <Link to="/login">login</Link>
            </>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}
