import {Rezept} from "../../../models/rezept.model";
import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {ConfirmDialogButton} from "../../form-elements/ConfirmDialogButton";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";

export function StartCooking({rezept}: { rezept: Rezept }) {
  const navigate = useNavigate();

  const {state: {rezeptCooking}, dispatch} = useContext(StateContext) as StateContextType

  function startCooking() {
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
    dispatch({type: ActionTypes.SET_KOCHSTATUS, payload: {kochschrittIndex: -1, kochschrittFokus: false}})
    navigate('/rezept-cooking')
  }

  return (<ConfirmDialogButton
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
  )

}
