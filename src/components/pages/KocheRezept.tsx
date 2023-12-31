import React, {useContext, useEffect, useState} from "react";
import {RezeptZutaten} from "./rezept-detail/RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Kochschritte} from "./rezept-cooking/Kochschritte";
import {LinearProgress} from "@mui/material";

export function KocheRezept() {
  const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    if (rezeptCooking)
      localStorage.setItem('rezept_cooking', JSON.stringify(rezeptCooking));
  }, [rezeptCooking])

  const handleStop = () => {
    localStorage.setItem('rezept_cooking', '');
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: undefined})
    navigate('/rezepte')
  }

  useEffect(() => {
    if (kochstatus.kochschrittIndex === -1)
      return setProgress(0)
    if (!rezeptCooking?.kochschritte.length)
      return setProgress(100)
    const result = kochstatus.kochschrittIndex / rezeptCooking?.kochschritte?.length * 100
    setProgress(result)
  }, [kochstatus, rezeptCooking, setProgress])


  if (rezeptCooking)
    return (<>
      <h1>{rezeptCooking.name}</h1>
      {kochstatus.etd && <h2>ETD: {kochstatus.etd?.toString()}</h2>}
      {!kochstatus.etd && <h2>Gesamtdauer {rezeptCooking.gesamtdauer} Minuten</h2>}
      <LinearProgress variant="determinate" value={progress}/>
      <hr/>
      <RezeptZutaten zutaten={rezeptCooking?.zutaten}/>
      <hr/>
      <Kochschritte kochschritte={rezeptCooking.kochschritte}/>
      <Button onClick={handleStop}>Beenden</Button>
    </>)

  return (<>Fehler</>)

}
