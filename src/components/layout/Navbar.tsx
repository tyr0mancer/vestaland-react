import React, {useContext} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import login from '../../assets/images/login.png';

import {useAuth} from "../../services/auth/AuthProvider";
import {StateContext} from "../../services/contexts/StateProvider";
import {StateContextType} from "../../services/contexts/types";


export function MainMenu({title}: { title?: string }) {
  const {isAuthorized, authInfo} = useAuth()
  const {state} = useContext(StateContext) as StateContextType
  const rezeptUrl = state.aktuelleRezeptId ? "/rezepte/" + state.aktuelleRezeptId : "/rezepte/"


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
            <Nav.Link as={NavLink} to={rezeptUrl}>Rezepte</Nav.Link>
            {isAuthorized() && <>
                <Nav.Link as={NavLink} to="/einkaufsliste">Einkaufsliste</Nav.Link>
                <Nav.Link as={NavLink} to="/plan">Essensplan</Nav.Link>
                <Nav.Link as={NavLink} to="/vorrat">Vorrat</Nav.Link>
            </>}
          </Nav>
          <hr/>

          {isAuthorized() && <>
              <Nav>
                  <Nav.Link as={NavLink} to="/lebensmittel">Adminbereich</Nav.Link>
              </Nav>
              <hr/>
          </>}

          <Navbar.Text>
            {isAuthorized() && <>
                <Link to="/user">{authInfo?.name}</Link>
            </>}
            {!isAuthorized() && <>
                <Link to="/login"><img src={login} height={24} alt={"login"}/> anmelden</Link>
            </>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}
