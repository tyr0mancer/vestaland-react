import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {Button, Form, InputGroup} from "react-bootstrap";

import globalContext from "../../services/contexts/globalContext";
import {rezeptSuche} from "../../services/api/rezeptService";
import {useDebounce} from "../../services/hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";
import {RezeptSucheQuery} from "../../services/contexts/GlobalContextProvider";

export function RezeptSuche() {
  const {rezeptSucheQuery, setRezeptSucheQuery} = useContext(globalContext)
  const searchQueryNameDebounced = useDebounce<string>(rezeptSucheQuery.name, 1000)

  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryNameDebounced],
      queryFn: () => rezeptSuche(searchQueryNameDebounced),
      enabled: (searchQueryNameDebounced.length > 0),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const handleInputChange = (event: any) => {
    setRezeptSucheQuery((oldQuery: RezeptSucheQuery) => {
      return {
        ...oldQuery,
        name: event.target.value
      }
    })
  };

  function handleSubmit(event: any) {
    event.preventDefault()
  }

  return (<>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <InputGroup>
          <Form.Control type="text" placeholder="Name des Rezeptes" value={rezeptSucheQuery.name || ''}
                        onChange={handleInputChange}/>
          <Button variant="primary" onClick={() => refetch()}>Suche</Button>
        </InputGroup>
      </Form.Group>
      <hr/>

      <Form.Group>
        <InputGroup>
          <Form.Check // prettier-ignore
            type="switch"
            id="vegetarian-only"
            label="Nur vegetarisches"
          />
          <Form.Check // prettier-ignore
            type="switch"
            id="storage-available"
            label="Nur mit vorrätigen Zutaten"
          />
          <Form.Check // prettier-ignore
            type="switch"
            id="healthy-only"
            label="Nur diätisch"
          />
        </InputGroup>
      </Form.Group>
    </Form>
    <hr/>
  </>);
}
