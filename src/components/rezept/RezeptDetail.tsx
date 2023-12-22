import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {rezeptDetail} from "../../services/api/rezeptService";
import {RezeptZutaten} from "./RezeptZutaten";

export function RezeptDetail() {
  let {rezeptId = ''} = useParams();

  const {
    isLoading,
    isSuccess,
    data: rezept
  } = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      //cacheTime: 1000 * 60 * 60, // 1 hour
    });

  if (isLoading) return (<>Lädt...</>)

  if (isSuccess)
    return (<>
      <h1>{rezept.name}</h1>
      <hr/>
      <RezeptZutaten zutaten={rezept?.zutaten}/>
      <hr/>
      <Link to='/rezepte'><Button>zurück</Button></Link>
      <hr/>
      <pre>{JSON.stringify(rezept, null, 2)}</pre>
    </>)

  return (<>Fehler</>)

}
