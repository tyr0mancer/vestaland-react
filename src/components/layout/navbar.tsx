import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const MainMenu = () => {

  return (<>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">vestaland</Navbar.Brand>
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

/*


export function Navbar() {


  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/rezepte">Rezepte suchen</Link>
      <Link to="/lebensmittel">Lebensmittel verwalten</Link>
    </div>
  )
}
*/
