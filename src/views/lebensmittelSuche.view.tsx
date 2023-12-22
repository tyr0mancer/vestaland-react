import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Button, Container, Form, ListGroup} from "react-bootstrap";

import {useDebounce} from "../hooks/use-debounce";
import {lebensmittelImport, lebensmittelSuche} from "../services/api/lebensmittelService";
import {MainMenu} from "../components/layout/Navbar";


function handleSubmit(event: any) {
  event.preventDefault()
}


export function LebensmittelSuche() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounced = useDebounce(searchQuery, 300)
  const {
    isSuccess,
    refetch,
    data
  } = useQuery(
    {
      queryKey: ["lebensmittel-suche", searchQueryDebounced],
      queryFn: () => lebensmittelSuche(searchQueryDebounced),
      enabled: searchQuery.length > 0, // Disable query if input is empty
      staleTime: 1000 * 60 * 5, // 5 minutes
    });


  const importResponse = useQuery(
    {
      queryKey: ["lebensmittel-import"],
      queryFn: lebensmittelImport,
    });


  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (<div>
    <MainMenu/>
    <Container className="main-layout">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name des Lebensmittels" onChange={handleInputChange}/>
        </Form.Group>

        <hr/>
        <Button onClick={() => refetch()}>Suche</Button>

        <Button onClick={() => importResponse.refetch()}>Import</Button>

        <ListGroup>
          {isSuccess && data.map((lebensmittel: any) =>
            <ListGroup.Item key={lebensmittel._id}>{lebensmittel._id} {lebensmittel.name}</ListGroup.Item>)}
        </ListGroup>
      </Form>
    </Container>
  </div>)
}
