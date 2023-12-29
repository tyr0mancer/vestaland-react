import React, {useContext, useEffect} from "react";
import {RezeptZutaten} from "../../components/rezept/RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Kochschritte} from "../../components/rezept-cooking/Kochschritte";

export function RezeptCookingView() {
  const {state: {rezeptCooking}, dispatch} = useContext(StateContext) as StateContextType
  const navigate = useNavigate();

  useEffect(() => {
    if (rezeptCooking)
      localStorage.setItem('rezept_cooking', JSON.stringify(rezeptCooking));
  }, [rezeptCooking])

  const handleStop = () => {
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: undefined})
    navigate('/rezepte')
  }


  if (rezeptCooking)
    return (<>
      <h1>{rezeptCooking.name}</h1>
      <hr/>
      <RezeptZutaten zutaten={rezeptCooking?.zutaten}/>
      <hr/>
      <Kochschritte kochschritte={rezeptCooking.kochschritte} />
      <Button onClick={handleStop}>Beenden</Button>
    </>)

  return (<>Fehler</>)

}
