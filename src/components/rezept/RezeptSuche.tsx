import React, {useContext} from "react";
import {useDebounce} from "../../hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";
import {rezeptSuche} from "../../services/api/rezeptService";
import {Button, Form} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import globalContext from "../../services/contexts/globalContext";

export function RezeptSuche() {
  const {rezeptSuche: searchQuery, setRezeptSuche} = useContext(globalContext)
  const searchQueryDebounced = useDebounce(searchQuery, 300)


  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryDebounced],
      queryFn: () => rezeptSuche(searchQueryDebounced),
      enabled: searchQuery.length > 0, // Disable query if input is empty
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const handleInputChange = (event: any) => {
    setRezeptSuche(event.target.value);
  };

  function handleSubmit(event: any) {
    event.preventDefault()
  }

  return (<>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label> </Form.Label>
        <Form.Control type="text" placeholder="Name des Rezeptes" value={searchQuery || ''}
                      onChange={handleInputChange}/>
      </Form.Group>
      <Button onClick={() => refetch()}>Suche</Button>
    </Form>
    <hr/>
  </>);
}
