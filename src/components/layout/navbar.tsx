import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import meinBild from '../../assets/images/logo.png';

const MainMenu = () => {

  return (<>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={meinBild} alt="Beschreibung des Bildes" style={{height: 64}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/rezepte">Rezepte</Nav.Link>
            <Nav.Link as={NavLink} to="/lebensmittel">Lebensmittel</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
};

export default MainMenu;
