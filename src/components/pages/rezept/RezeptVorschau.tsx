import React from "react";
import {useNavigate} from "react-router-dom";
import {Badge, Card, Col} from "react-bootstrap";
import {Rezept} from "../../../models/rezept.model";
import rezeptDummy1 from '../../../assets/images/dummy/kastenbrot.png';

export function RezeptVorschau({rezept}: { rezept: Rezept }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/rezepte/' + rezept._id);
  }

  return (
    <Col>
      <Card onClick={handleCardClick}>
        {rezept.bild && <img src={'https://api.vestaland.de/public/uploads/' + rezept.bild?.fileName} height={100} alt={rezept.bild.name}/>}
        {!rezept.bild && <img src={rezeptDummy1} alt={"Dummybild"} height={100}/>}

        <Card.Body>
          <Card.Title>{rezept.name}</Card.Title>
          <Card.Text>
            {rezept.beschreibung}
          </Card.Text>
          <Card.Text>

            {rezept.kochschritte?.length} Schritte
            {rezept.zutaten.length} Zutaten
            {rezept.hilfsmittel.length} Hilfsmittel
          </Card.Text>
          <Card.Text>
            {(rezept.name === 'Blumenhuhn') && <>
                <Badge bg="secondary">Diätisch</Badge>
            </>}
            {(rezept.name !== 'Blumenhuhn') && <>
                <Badge bg="primary">Vorrat</Badge>
                <Badge bg="secondary">Vegetarisch</Badge>
            </>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
