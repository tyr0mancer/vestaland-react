import {Zutat} from "../models/zutat.model";
import {Utensil} from "../models/utensil.model";
import {Kochschritt} from "../models/kochschritt.model";
import {Nutrients} from "../models/lebensmittel.model";


interface KochschrittSummary {
  berechneteArbeitszeit: number,
  berechneteGesamtdauer: number,
  zutaten: Zutat[],
  utensilien: Utensil[],
  nutrients: Nutrients
}

const kochschrittSummaryDefault: KochschrittSummary = {
  berechneteArbeitszeit: 0,
  berechneteGesamtdauer: 0,
  zutaten: [],
  utensilien: [],
  nutrients: new Nutrients()
}

const utensilienReducer = (utensilien: Utensil[], utensil: Utensil) => [...utensilien, utensil]

//@todo doppelte lebensmittel zusammenfassen
const zutatenReducer = (zutaten: Zutat[], zutat: Zutat) => [...zutaten, zutat]
const nutrientsReducer = (nutrients: Nutrients, zutat: Zutat) => {
  nutrients.proteine += zutat.lebensmittel?.nutrients?.proteine || 0
  nutrients.fett += zutat.lebensmittel?.nutrients?.fett || 0
  nutrients.ballaststoffe += zutat.lebensmittel?.nutrients?.ballaststoffe || 0
  nutrients.zucker += zutat.lebensmittel?.nutrients?.zucker || 0
  nutrients.kohlenhydrate += zutat.lebensmittel?.nutrients?.kohlenhydrate || 0
  return nutrients
}

function kochschrittReducer(currentValue: KochschrittSummary, kochschritt: Kochschritt) {
  let berechneteArbeitszeit = currentValue.berechneteArbeitszeit + (kochschritt?.arbeitszeit || 0)
  let berechneteGesamtdauer = currentValue.berechneteGesamtdauer + (kochschritt?.gesamtdauer || (berechneteArbeitszeit + (kochschritt.wartezeit || 0)))
  let zutaten = kochschritt.zutaten.reduce(zutatenReducer, currentValue.zutaten)
  let utensilien = kochschritt.utensilien.reduce(utensilienReducer, currentValue.utensilien)
  let nutrients: Nutrients = kochschritt.zutaten.reduce(nutrientsReducer, currentValue.nutrients)

  return {
    berechneteArbeitszeit,
    berechneteGesamtdauer,
    zutaten,
    utensilien,
    nutrients
  }
}

export function getKochschrittSummary(kochschritte: Kochschritt[]): KochschrittSummary {
  return kochschritte.reduce(kochschrittReducer, kochschrittSummaryDefault)
}

export function multiplyNutrients(nutrients: Nutrients, factor: number): Nutrients {
  nutrients.proteine = nutrients.proteine * factor
  nutrients.fett = nutrients.fett * factor
  nutrients.kohlenhydrate = nutrients.kohlenhydrate * factor
  nutrients.zucker = nutrients.zucker * factor
  nutrients.ballaststoffe = nutrients.ballaststoffe * factor

  return nutrients
}
