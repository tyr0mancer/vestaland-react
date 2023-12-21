import React from "react";
import {useNavigate} from "react-router-dom";
import {Card, Col} from "react-bootstrap";

import {Rezept} from "../../models/rezept.model";

export function RezeptVorschau({rezept}: { rezept: Rezept }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/rezept/' + rezept._id);
  }

  return (
    <Col>
      <Card style={{width: '18rem'}} onClick={handleCardClick}>
        <Card.Body>
          <Card.Title>{rezept.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
