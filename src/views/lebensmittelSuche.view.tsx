import React from "react";
import MainMenu from "../components/layout/navbar";
import {Form} from "react-bootstrap";

export function LebensmittelSuche() {
  return (<>
    <MainMenu/>
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name des Lebensmittels"/>
      </Form.Group>
    </Form>
    <hr/>
  </>);
}
