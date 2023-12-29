import React from "react";
import {RezeptZutaten} from "./RezeptZutaten";
import useLocalStorage from "use-local-storage";
import {Rezept} from "../../models/rezept.model";

export function RezeptCooking() {


  const [rezept,] = useLocalStorage<Rezept | null>("rezept_cooking", new Rezept())

  if (rezept)
    return (<>
      <h1>{rezept.name}</h1>
      <hr/>
      <RezeptZutaten zutaten={rezept?.zutaten}/>
      <hr/>
      <pre>{JSON.stringify(rezept, null, 2)}</pre>
    </>)

  return (<>Fehler</>)

}
