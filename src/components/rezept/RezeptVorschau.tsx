import React from "react";
import {useNavigate} from "react-router-dom";
import {Badge, Card, Col} from "react-bootstrap";
import {Rezept} from "../../models/rezept.model";
import rezeptDummy1 from '../../assets/images/dummy/kastenbrot.png';
import rezeptDummy2 from '../../assets/images/dummy/blumenhuhn.png';

export function RezeptVorschau({rezept}: { rezept: Rezept }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/rezept/' + rezept._id);
  }

  return (
    <Col>
      <Card onClick={handleCardClick}>
        {(rezept.name==='Blumenhuhn') && <img src={rezeptDummy2} alt={"Blumenhuhn"} height={100}/>}
        {(rezept.name!=='Blumenhuhn') && <img src={rezeptDummy1} alt={"Kastenbrot"} height={100}/>}
        <Card.Body>
          <Card.Title>{rezept.name}</Card.Title>
          <Card.Text>
            {rezept.beschreibung}
          </Card.Text>
          <Card.Text>
            {rezept.arbeitsschritte.length} Schritte
            {rezept.zutaten.length} Zutaten
            {rezept.hilfsmittel.length} Hilfsmittel
          </Card.Text>
          <Card.Text>
            {(rezept.name==='Blumenhuhn') && <>
                <Badge bg="secondary">Diätisch</Badge>
            </>}
            {(rezept.name!=='Blumenhuhn') && <>
                <Badge bg="primary">Vorrat</Badge>
                <Badge bg="secondary">Vegetarisch</Badge>
            </>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
