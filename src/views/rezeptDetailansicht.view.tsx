import React from "react";
import { Button } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import MainMenu from "../components/layout/navbar";

export function RezeptDetailansicht() {
  let { rezeptId } = useParams();


  return (<>
    <MainMenu/>
    <div>
      <h1>Rezept Detail #{rezeptId}</h1>
      <Link to='/rezepte'><Button>zurück</Button></Link>
    </div>
  </>);
}
