import {Button, Collapse, Table} from "react-bootstrap";
import React, {useState} from "react";

export function RezeptZutaten(props: any) {
  const {zutaten} = props
  const [open, setOpen] = useState(false);
  if (!Array.isArray(zutaten)) return (<pre>Zutaten: {JSON.stringify(zutaten, null, 2)}</pre>)

  //return (<pre>Zutaten: {JSON.stringify(zutaten, null, 2)}</pre>)

  return (<>
    <Button
      onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    > Zutaten anzeigen
    </Button>
    <Collapse in={open}>
      <div id="example-collapse-text">
        <Table striped bordered hover size="sm">
          <tbody>
          {zutaten && zutaten.map((zutat: any) =>
            (<tr>
              <td>{zutat.menge}</td>
              <td>{zutat.einheit}</td>
              <td>{zutat.name}</td>
            </tr>)
          )}
          </tbody>
        </Table>
      </div>
    </Collapse>
  </>)

}
