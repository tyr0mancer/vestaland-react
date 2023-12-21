import React, {useState} from "react";
import {useDebounce} from "../../hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";
import {rezeptSuche} from "../../services/api/rezeptService";
import {Button, Form, Row} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {RezeptVorschau} from "./RezeptVorschau";

export function RezeptSuche() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounced = useDebounce(searchQuery, 300)

  const {
    isSuccess,
    refetch,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryDebounced],
      queryFn: () => rezeptSuche(searchQueryDebounced),

      /*
            enabled: searchQuery.length > 0, // Disable query if input is empty
            keepPreviousData: true, // Keep showing previous results until new ones are loaded
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 60, // 1 hour
      */
    });

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  function handleSubmit(event: any) {
    event.preventDefault()
  }

  return (<>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name des Rezeptes" onChange={handleInputChange}/>
      </Form.Group>
    </Form>

    <hr/>
    <Button onClick={() => refetch()}>Suche</Button>
    <Row>
      {isSuccess && data.map(rezept => <RezeptVorschau key={rezept._id} rezept={rezept}/>)}
    </Row>

  </>);
}
