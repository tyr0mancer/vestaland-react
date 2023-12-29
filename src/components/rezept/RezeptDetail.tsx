import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {rezeptDetail} from "../../services/api/rezeptService";
import {RezeptZutaten} from "./RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";

export function RezeptDetail() {
  const {rezeptId = ''} = useParams();
  const navigate = useNavigate();
  const {state: {rezeptCooking}, dispatch} = useContext(StateContext) as StateContextType
  const {
    isLoading,
    isSuccess,
    data: rezept
  } = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  function handleBackToSearch() {
    dispatch({type: ActionTypes.SET_REZEPT_VIEW, payload: undefined})
    navigate('/rezepte/');
  }

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_VIEW, payload: rezept})
    if (rezept)
      dispatch({type: ActionTypes.PUSH_REZEPT_ID, payload: {_id: rezept._id || '', name: rezept.name}})
  }, [rezept, dispatch])

  
  function startCooking() {
    if (rezeptCooking)
      alert("overwrite")
    //alert(rezept?.name||'nothing')
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
    //setRezeptCooking(rezept)
    navigate('/rezept-cooking/')
  }


  if (isLoading) return (<>Lädt...</>)

  if (isSuccess)
    return (<>
      <h1>{rezept.name}</h1>
      <hr/>
      <RezeptZutaten zutaten={rezept?.zutaten}/>
      <hr/>
      <Button onClick={handleBackToSearch}>zurück zur Suche</Button>
      <Button onClick={startCooking}>Jetzt kochen</Button>
      <hr/>
      <pre>{JSON.stringify(rezept, null, 2)}</pre>
    </>)

  return (<>Fehler</>)

}
