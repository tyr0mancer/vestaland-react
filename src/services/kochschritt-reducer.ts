import {Zutat} from "../models/zutat.model";
import {Utensil} from "../models/utensil.model";
import {Kochschritt} from "../models/kochschritt.model";


interface KochschrittSummary {
  arbeitszeit: number,
  wartezeit: number,
  gesamtdauer: number,
  zutaten: Zutat[],
  utensilien: Utensil[]
}

const kochschrittSummaryDefault: KochschrittSummary = {
  arbeitszeit: 0,
  wartezeit: 0,
  gesamtdauer: 0,
  zutaten: [],
  utensilien: []
}

function kochschrittReducer(summary: KochschrittSummary, kochschritt: Kochschritt) {
  let zutaten = kochschritt.zutaten.reduce((bisherigeListe, zutat) => {
    return [...bisherigeListe, zutat]
  }, summary.zutaten)

  let utensilien = [...summary.utensilien, ...kochschritt.utensilien]
  let arbeitszeit = summary.arbeitszeit + (kochschritt?.arbeitszeit || 0)
  let wartezeit = summary.wartezeit + (kochschritt?.wartezeit || 0)
  let gesamtdauer = summary.wartezeit + (kochschritt?.gesamtdauer || arbeitszeit + wartezeit)

  return {
    arbeitszeit,
    wartezeit,
    gesamtdauer,
    zutaten,
    utensilien
  }
}

export function reduceKochschritte(kochschritte: Kochschritt[]): KochschrittSummary {
  return kochschritte.reduce(kochschrittReducer, kochschrittSummaryDefault)
}
