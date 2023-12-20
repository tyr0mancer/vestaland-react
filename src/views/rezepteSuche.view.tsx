import React from "react";
import {Link} from "react-router-dom";
import MainMenu from "../components/layout/navbar";
import {Form, ListGroup} from "react-bootstrap";


function handleSubmit(event: any) {
  event.preventDefault()
  console.log(event)
}

export function RezepteSuche() {

  return (<>
    <MainMenu/>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name des Rezeptes"/>
      </Form.Group>
    </Form>

    <hr/>

    <ListGroup>
      <Link to='/rezept/abc'><ListGroup.Item>Rezept abc</ListGroup.Item></Link>
      <Link to='/rezept/xzy'><ListGroup.Item>Rezept xzy</ListGroup.Item></Link>
      <Link to='/rezept/123'><ListGroup.Item>Rezept 123</ListGroup.Item></Link>
    </ListGroup>

  </>);
}
