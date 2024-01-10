import React from "react";
import {Rezept} from "../../../shared-types/models/rezept.model";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import EngineeringIcon from '@mui/icons-material/Engineering';

interface ShowTimesProps {
  rezept: Rezept,
  portionen?: number,
}

/**
 * TS Doc Info
 * @component ShowTimes
 */
export function ShowTimes({rezept, portionen = 0}: ShowTimesProps): React.ReactElement {

  const extraPortion = portionen - rezept.portionen
  let gesamtdauer = rezept?.realeGesamtdauer || rezept?.berechneteGesamtdauer || 0
  let arbeitszeit = rezept?.realeArbeitszeit || rezept?.berechneteArbeitszeit || 0

  if (extraPortion > 0) {
    if (rezept.extraPortionGesamtdauer)
      gesamtdauer += rezept.extraPortionGesamtdauer * extraPortion
    if (rezept.extraPortionArbeitszeit)
      arbeitszeit += rezept.extraPortionArbeitszeit * extraPortion
  }


  return (<>
    {!!gesamtdauer && <div><HistoryToggleOffIcon aria-label={'Gesamtdauer'}/> {minutesToString(gesamtdauer)}</div>}
    {!!arbeitszeit && <div><EngineeringIcon aria-label={'Arbeitszeit'}/> {minutesToString(arbeitszeit)}</div>}
  </>)
}

function minutesToString(minutes: number): string {
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;
  const hoursStr: string = hours < 10 ? "0" + hours : hours.toString();
  const minutesStr: string = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes.toString();
  return hours ? hoursStr + ":" + minutesStr : minutesStr + " Min";
}
