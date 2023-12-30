import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {rezeptDetail} from "../../services/api/rezeptService";
import {RezeptZutaten} from "./rezept/RezeptZutaten";
import {StateContext} from "../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../services/contexts/types";
import {useAuth} from "../../services/auth/AuthProvider";
import {ConfirmDialogButton} from "../form-elements/ConfirmDialogButton";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";

export function RezeptDetail() {
  const {rezeptId = ''} = useParams();
  const navigate = useNavigate();
  const {isOwner} = useAuth();

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
    navigate('/rezepte');
  }

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_VIEW, payload: rezept})
    if (rezept)
      dispatch({type: ActionTypes.PUSH_REZEPT_ID, payload: {_id: rezept._id || '', name: rezept.name}})
  }, [rezept, dispatch])


  function startCooking() {
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
    dispatch({type: ActionTypes.SET_KOCHSTATUS, payload: {kochschrittIndex: -1, kochschrittFokus: false}})
    navigate('/rezept-cooking')
  }


  const editRecipe = () => {
    //localStorage.setItem('rezept_editor', JSON.stringify(rezept));

    if (!rezept) return
    dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    //localStorage.setItem('rezept_cooking', JSON.stringify(rezept));
    navigate('/rezept-editor');
  }


  if (isLoading) return (<>Lädt...</>)

  if (isSuccess)
    return (<>
      <h1>
        {isOwner(rezept._id) && <Button onClick={editRecipe}>editieren</Button>}


        {rezept.name} <Button onClick={handleBackToSearch}>zurück</Button></h1>


      <Row>
        <Col>{rezept.bild && <img src={'https://api.vestaland.de/public/uploads/' + rezept.bild?.fileName} height={200}
                                  alt={rezept.bild.name}/>}</Col>
        <Col>
          <RezeptZutaten zutaten={rezept?.zutaten}/>
        </Col>
      </Row>

      <hr/>

      <ConfirmDialogButton
        label={'Jetzt kochen'}
        onConfirm={startCooking}
        labelReject={`Nein, ${rezeptCooking?.name} weiter kochen`}
        autoConfirm={() => {
          return rezept && !rezeptCooking?.name
        }}
      >{rezeptCooking && <><DialogTitle>Es wird bereits ein Rezept ({rezeptCooking?.name})
          gekocht.</DialogTitle>
          <DialogContent><DialogContentText>Dieses stoppen und
              stattdessen {rezept?.name} kochen?</DialogContentText></DialogContent>
      </>}</ConfirmDialogButton>


      <hr/>
      {rezept.kochschritte.map((kochschritt, index) => <div key={index}>
        {kochschritt.name}
        <ul>
          {kochschritt.zutaten.map((zutat, index) => <li
            key={index}>{zutat.menge} {zutat.einheit} {zutat.lebensmittel?.name}</li>)}
        </ul>
        <ul>
          {kochschritt.hilfsmittel.map((hilfsmittel, index) => <li key={index}>{hilfsmittel.name}</li>)}
        </ul>
      </div>)}

      {/*<pre>{JSON.stringify(rezept, null, 2)}</pre>*/}
    </>)

  return (<>Fehler</>)

}
