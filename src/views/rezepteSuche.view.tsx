import React, {useState} from "react";
import {Link} from "react-router-dom";
import MainMenu from "../components/layout/navbar";
import {Button, Form, ListGroup} from "react-bootstrap";
import {useQuery} from "react-query";
import {rezeptSuche} from "../services/api/rezeptService";
import {useDebounce} from "../hooks/use-debounce";


function handleSubmit(event: any) {
  event.preventDefault()
}


export function RezepteSuche() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounced = useDebounce(searchQuery, 300)
  const {
    isSuccess,
    refetch,
    data
  } = useQuery(["rezept-suche", searchQueryDebounced], () => rezeptSuche(searchQueryDebounced),
    {
      enabled: searchQuery.length > 0, // Disable query if input is empty
      keepPreviousData: true, // Keep showing previous results until new ones are loaded
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    });

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (<>
    <MainMenu/>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name des Rezeptes" onChange={handleInputChange}/>
      </Form.Group>
    </Form>

    <hr/>
    <Button onClick={() => refetch()}>Suche</Button>
    <ListGroup>
      {isSuccess && data.map((rezept: any) => {
        return (<Link key={rezept._id} to={`/rezept/${rezept._id}`}><ListGroup.Item>{rezept.name}</ListGroup.Item></Link>)
      })}
    </ListGroup>

  </>);
}
