import React, {useContext} from "react";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {ShowKochschrittAktion} from "../../common/formatting/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {getDateInFuture} from "./Kochschritte";
import Button from "@mui/material/Button";

interface KocheRezeptKochschrittProps {
  index: number
}

/**
 * TS Doc Info
 * @component KocheRezeptKochschritt
 */
export function KocheRezeptKochschritt({index}: KocheRezeptKochschrittProps): React.ReactElement {

  const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      dispatch({
        type: ActionTypes.SET_KOCHSTATUS,
        payload: {...kochstatus, kochschrittFokusIndex: isExpanded ? panel : false}
      })
    };

  const kochschritt = rezeptCooking?.kochschritte[index]

  const setIndex = (neuerKochschrittIndex: number) => {
    if (!rezeptCooking) return
    const restZeit = kochstatus.meta.filter((k, index) => (index >= neuerKochschrittIndex)).reduce((a, c) => {
      return a + (c.length || 0)
    }, 0)
    const etd = getDateInFuture(restZeit)

    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        etd,
        kochschrittFokusIndex: 'panel' + neuerKochschrittIndex,
        aktuellerKochschrittIndex: neuerKochschrittIndex
      }
    })
  }

  return (<Accordion
    expanded={kochstatus.kochschrittFokusIndex === 'panel' + index}
    onChange={handleChange('panel' + index)}
  >
    <AccordionSummary
      expandIcon={<ArrowDownwardIcon/>}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      {kochschritt?.aktionen.map((aktion, index) => <ShowKochschrittAktion aktion={aktion} key={index}/>)}

    </AccordionSummary>
    <AccordionDetails>

      <ShowZutaten zutaten={kochschritt?.zutaten || []}/>

      {index === kochstatus.aktuellerKochschrittIndex &&
          <Button onClick={() => setIndex(index + 1)}>Abschließen</Button>
      }
      {index === (kochstatus.aktuellerKochschrittIndex - 1) &&
          <Button onClick={() => setIndex(index)}>Reopen</Button>
      }
    </AccordionDetails>
  </Accordion>)
}
