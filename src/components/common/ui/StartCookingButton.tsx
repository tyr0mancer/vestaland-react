import React, {useContext} from "react";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../util/state/StateProvider";
import {ActionTypes, StateContextType} from "../../../util/state/types";
import {Blender} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {customConfirm} from "./ConfirmDialog";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";

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

    const summary = rezept.kochschritte.reduce((previousValue: any[], currentValue: Kochschritt) => {

      let gesamtdauer = currentValue.gesamtdauer || ((currentValue.arbeitszeit || 0) + (currentValue.wartezeit || 0))
      let arbeitszeit = currentValue.arbeitszeit || 0

      let ratio = null
      if (arbeitszeit && gesamtdauer) ratio = arbeitszeit / gesamtdauer

      const newValue = {
        length: gesamtdauer,
        ratio: ratio,
        aktionen: currentValue.aktionen
      }

      return [...previousValue, newValue]
    }, [])

    dispatch({type: ActionTypes.PUSH_HISTORY, payload: rezept})
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
    dispatch({
      type: ActionTypes.SET_KOCHSTATUS,
      payload: {kochschrittIndex: -1, kochschrittFokus: false, kochschrittSummary: summary}
    })
    navigate('/rezept-cooking')
  }

  return (<IconButton aria-label="startCooking" onClick={startCooking} color={'primary'} size={'small'}>
      <Blender/> Jetzt kochen!
    </IconButton>
  )
}
