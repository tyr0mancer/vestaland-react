import React, {useState} from "react";
import MainMenu from "../components/layout/navbar";
import {Button, Form, ListGroup} from "react-bootstrap";
import {useQuery} from "react-query";
import {useDebounce} from "../hooks/use-debounce";
import {lebensmittelSuche} from "../services/api";


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
  } = useQuery(["lebensmittel-suche", searchQueryDebounced], () => lebensmittelSuche(searchQueryDebounced),
    {
      enabled: searchQuery.length > 0, // Disable query if input is empty
      keepPreviousData: true, // Keep showing previous results until new ones are loaded
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    });

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (<div>
    <MainMenu/>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name des Lebensmittels" onChange={handleInputChange}/>
      </Form.Group>

      <hr/>
      <Button onClick={() => refetch()}>Suche</Button>
      <ListGroup>
        {isSuccess && data.map((lebensmittel: any) =>
          <ListGroup.Item key={lebensmittel._id}>{lebensmittel._id} {lebensmittel.name}</ListGroup.Item>)}
      </ListGroup>
    </Form>
  </div>)
}
