import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Container, Form, InputGroup, ListGroup} from "react-bootstrap";

import {useDebounce} from "../../services/hooks/use-debounce";
import {lebensmittelDelete, lebensmittelSuche} from "../../services/api/lebensmittelService";
import {FaFileCircleMinus, FaPenToSquare} from "react-icons/fa6";


function handleSubmit(event: any) {
  event.preventDefault()
}


export function LebensmittelAdmin() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounced = useDebounce(searchQuery, 300)
  const queryClient = useQueryClient();

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


  const {mutate} = useMutation({
    mutationFn: lebensmittelDelete,
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["lebensmittel-suche", searchQueryDebounced]
    })
  });

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };



  return (<>
    <Container className="main-layout">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <InputGroup>
            <Form.Control type="text" placeholder="Name des Lebensmittels" onChange={handleInputChange}/>
            <Button onClick={() => refetch()}>Suche</Button>
          </InputGroup>
        </Form.Group>

        <ListGroup>
          {isSuccess && data.map((lebensmittel: any) =>
            <ListGroup.Item key={lebensmittel._id}>
              <Button variant="danger" size="sm">
                <FaFileCircleMinus onClick={() => mutate(lebensmittel._id)}/>
              </Button>
              <b>{lebensmittel.name}</b>
              -
              <i>{lebensmittel._id}</i>
              <Button variant="outline-warning" size="sm">
                <FaPenToSquare/>
              </Button>
            </ListGroup.Item>)}
        </ListGroup>
      </Form>
    </Container>
  </>)
}
