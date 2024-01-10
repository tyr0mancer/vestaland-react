import React, {useContext} from "react";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../util/state/StateProvider";
import {ActionTypes, StateContextType} from "../../../util/state/types";
import {Blender} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {customConfirm} from "./ConfirmDialog";

interface StartCookingButtonProps {
  rezept: Rezept
}

/**
 * TS Doc Info
 * @component StartCookingButton
 */
export function StartCookingButton({rezept}: StartCookingButtonProps): React.ReactElement {
  const navigate = useNavigate();

  const {state: {rezeptCooking}, dispatch} = useContext(StateContext) as StateContextType

  async function startCooking() {
    const result = !rezeptCooking || await customConfirm({title: 'Es wird bereits gekocht.', label: rezeptCooking.name})
    if (!result) return

    dispatch({type: ActionTypes.PUSH_HISTORY, payload: rezept})
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
    dispatch({type: ActionTypes.SET_KOCHSTATUS, payload: {kochschrittIndex: -1, kochschrittFokus: false}})
    navigate('/rezept-cooking')
  }

  return (<IconButton aria-label="startCooking" onClick={startCooking} color={'primary'} size={'small'}>
      <Blender/> Jetzt kochen!
    </IconButton>
  )
}
