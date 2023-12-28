import React, {useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Form, InputGroup} from "react-bootstrap";

import {rezeptSuche} from "../../services/api/rezeptService";
import {useDebounce} from "../../services/hooks/use-debounce";
import {Rezept} from "../../models/rezept.model";
import {ActionTypes, RezeptSucheQuery, StateContextType} from "../../services/contexts/types";
import {StateContext} from "../../services/contexts/StateProvider";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

export function RezeptSuche() {
  const {state, dispatch} = useContext(StateContext) as StateContextType
  const [rezeptQuery, setRezeptQuery] = useState<RezeptSucheQuery>(state.rezeptSucheQuery)
  const rezeptQueryDebounced = useDebounce<RezeptSucheQuery>(rezeptQuery, 300)

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_SUCHE, payload: rezeptQueryDebounced})
  }, [dispatch, rezeptQueryDebounced])

  const {
    refetch
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezept-suche", rezeptQueryDebounced.name],
      queryFn: () => rezeptSuche(rezeptQueryDebounced.name),
      enabled: (rezeptQueryDebounced.name.length > 0),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const handleNameChange = (event: any) => {
    setRezeptQuery(q => {
      return {...q, name: event.target.value}
    })
  };

  const handleVegetarianCheck = (event: any) => {
    setRezeptQuery(q => {
      return {...q, vegetarian: event.target.checked}
    })
  };

  const handleHealthyCheck = (event: any) => {
    setRezeptQuery(q => {
      return {...q, healthy: event.target.checked}
    })
  };

  function handleSubmit(event: any) {
    event.preventDefault()
  }


  return (<>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <InputGroup>
          <Form.Control type="text" placeholder="Name des Rezeptes"
                        value={rezeptQuery.name} onChange={handleNameChange}/>
          <Button onClick={() => refetch()}>Suche</Button>
        </InputGroup>
      </Form.Group>
      <hr/>

      <Form.Group>
        <InputGroup>
          <Form.Check
            type="switch"
            id="vegetarian-only"
            label="Nur vegetarisches"
            checked={rezeptQuery.vegetarian}
            onChange={handleVegetarianCheck}
          />
          <Form.Check
            type="switch"
            id="healthy-only"
            label="Nur diätisch"
            checked={rezeptQuery.healthy}
            onChange={handleHealthyCheck}
          />
          <Form.Check
            disabled={true}
            type="switch"
            id="storage-available"
            label="Nur mit vorrätigen Zutaten"
          />
        </InputGroup>
      </Form.Group>
    </Form>
    <hr/>

    <Button component={Link} to={'/rezepte/editor'}>Neu</Button>
  </>);
}
