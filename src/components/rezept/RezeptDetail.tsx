import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {rezeptDetail} from "../../services/api/rezeptService";
import {RezeptZutaten} from "./RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";
import useLocalStorage from "use-local-storage";
import {Rezept} from "../../models/rezept.model";

export function RezeptDetail() {

  let {rezeptId = ''} = useParams();
  const navigate = useNavigate();
  const {dispatch} = useContext(StateContext) as StateContextType
  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_CURRENT_ID, payload: rezeptId})
  }, [rezeptId, dispatch])

  function handleBackToSearch() {
    dispatch({type: ActionTypes.SET_REZEPT_CURRENT_ID, payload: ''})
    navigate('/rezepte/');
  }

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

  const [rezeptCooking, setRezeptCooking] = useLocalStorage<Rezept | null>("rezept_cooking", null)

  function startCooking() {
    if (rezeptCooking)
      alert("overwrite")
    setRezeptCooking(rezept)
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
