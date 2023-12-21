import React, {useContext, useEffect, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {Button, Form, InputGroup} from "react-bootstrap";

import globalContext from "../../services/contexts/globalContext";
import {rezeptSuche} from "../../services/api/rezeptService";
import {useDebounce} from "../../hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";

export function RezeptSuche() {
  const {rezeptSuche: searchQuery, setRezeptSuche} = useContext(globalContext)
  const searchQueryDebounced = useDebounce(searchQuery, 300)
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    // Schritt 4: Setzen des Fokus auf das Input-Element, sobald die Komponente geladen wurde
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Leer-Array bedeutet, dass dieser Effekt nur beim ersten Rendern ausgeführt wird


  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", searchQueryDebounced],
      queryFn: () => rezeptSuche(searchQueryDebounced),
      enabled: searchQueryDebounced.length > 0, // Disable query if input is empty
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
        <InputGroup>
          <Form.Control ref={inputRef}  type="text" placeholder="Name des Rezeptes" value={searchQuery || ''}
                        onChange={handleInputChange}/>
          <Button variant="primary" onClick={() => refetch()}>Suche</Button>
        </InputGroup>
      </Form.Group>
    </Form>
    <hr/>
  </>);
}
