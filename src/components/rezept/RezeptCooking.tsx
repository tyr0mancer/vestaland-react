import React, {useContext, useEffect} from "react";
import {RezeptZutaten} from "./RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {StateContextType} from "../../services/contexts/types";

export function RezeptCooking() {
  const {state: {rezeptCooking}} = useContext(StateContext) as StateContextType

  useEffect(() => {
    if (rezeptCooking)
      localStorage.setItem('rezept_cooking', JSON.stringify(rezeptCooking));
  }, [rezeptCooking])


  if (rezeptCooking)
    return (<>
      <h1>{rezeptCooking.name}</h1>
      <hr/>
      <RezeptZutaten zutaten={rezeptCooking?.zutaten}/>
      <hr/>
      <pre>{JSON.stringify(rezeptCooking, null, 2)}</pre>
    </>)

  return (<>Fehler</>)

}
