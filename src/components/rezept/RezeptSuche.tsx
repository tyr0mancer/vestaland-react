import React, {useState} from "react";
import {useDebounce} from "../../hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";
import {rezeptSuche} from "../../services/api/rezeptService";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {RezeptVorschau} from "./RezeptVorschau";

export function RezeptSuche() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounced = useDebounce(searchQuery, 300)

  const {
    isSuccess,
    isLoading,
    refetch,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryDebounced],
      queryFn: () => rezeptSuche(searchQueryDebounced),
      enabled: searchQuery.length > 0, // Disable query if input is empty
      staleTime: 1000 * 60 * 5, // 5 minutes

      /*
            keepPreviousData: true, // Keep showing previous results until new ones are loaded
            cacheTime: 1000 * 60 * 60, // 1 hour
      */
    });

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  function handleSubmit(event: any) {
    event.preventDefault()
  }

  return (<Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label> </Form.Label>
        <Form.Control type="text" placeholder="Name des Rezeptes" onChange={handleInputChange}/>
      </Form.Group>
      <Button onClick={() => refetch()}>Suche</Button>
    </Form>
    <hr/>

    <Row>
      {isLoading && <h1>Lädt...</h1>}
      {isSuccess && data.map(rezept => <RezeptVorschau key={rezept._id} rezept={rezept}/>)}
    </Row>

  </Container>);
}
