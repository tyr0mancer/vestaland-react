import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {rezeptDetail} from "../services/api/rezeptService";
import {RezeptZutaten} from "../components/rezept/RezeptZutaten";
import {MainMenu} from "../components/layout/Navbar";
import {useQuery} from "@tanstack/react-query";

export function RezeptDetailansicht() {
  let {rezeptId = ''} = useParams();

  const {
    isSuccess,
    data: rezept
  } = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      //cacheTime: 1000 * 60 * 60, // 1 hour
    });
  return (<>
    <MainMenu/>
    <div>
      {isSuccess && <>
          <h1>{rezept.name}</h1>
          <Link to='/rezepte'><Button>zurück</Button></Link>
          <hr/>
          <RezeptZutaten zutaten={rezept?.zutaten}/>
      </>}
    </div>
    <hr/>
    {/*<pre>{JSON.stringify(rezept.zutaten, null, 2)}</pre>*/}
  </>)

}
