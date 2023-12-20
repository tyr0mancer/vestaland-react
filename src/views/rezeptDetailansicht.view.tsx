import React from "react";
import {Link, useParams} from "react-router-dom";
import MainMenu from "../components/layout/navbar";
import {Button} from "react-bootstrap";
import {useQuery} from "react-query";
import {rezeptDetail} from "../services/api/rezeptService";

export function RezeptDetailansicht() {
  let {rezeptId = ''} = useParams();

  const {
    isSuccess,
    refetch,
    data: rezept
  } = useQuery(["rezept-detail", rezeptId], () => rezeptDetail(rezeptId),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    });
  return (<>
    <MainMenu/>
    <div>
      {isSuccess && <>
          <h1>{rezept.name}</h1>
          <Link to='/rezepte'><Button>zurück</Button></Link>
          <hr/>
          <pre>{JSON.stringify(rezept,null,2)}</pre>
      </>}
    </div>
    <hr/>
  </>)

}
