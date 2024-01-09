import React from "react";
import {Rezept} from "../../../shared-types/models/rezept.model";

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
    Gesamtdauer: {gesamtdauer} Minuten
    Arbeitszeit: {arbeitszeit} Minuten
  </>)
}
