import {Zutat} from "../../../shared-types/models/Zutat";
import {Utensil} from "../../../shared-types/models/Utensil";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Nutrients} from "../../../shared-types/models/Nutrients";
import {KochschrittSummary} from "./types";
import {multiplyNutrients} from "./index";


const utensilienReducer = (utensilien: Utensil[], utensil: Utensil) => [...utensilien, utensil]

const zutatenReducer = (zutaten: Zutat[], zutat: Zutat) => {
  const zutatGefunden = zutaten.find(z => (z.lebensmittel?._id === zutat.lebensmittel?._id))
  if (zutatGefunden) {
    zutatGefunden.menge += zutat.menge;
  } else {
    zutaten.push(zutat);
  }
  return zutaten
}

const nutrientsReducer = (nutrients: Nutrients, zutat: Zutat) => {
  if (!zutat.lebensmittel?.nutrients)
    return nutrients
  nutrients.kalorien += zutat.lebensmittel.nutrients?.kalorien || 0
  nutrients.proteine += zutat.lebensmittel.nutrients?.proteine || 0
  nutrients.fett += zutat.lebensmittel.nutrients?.fett || 0
  nutrients.ballaststoffe += zutat.lebensmittel.nutrients?.ballaststoffe || 0
  nutrients.zucker += zutat.lebensmittel.nutrients?.zucker || 0
  nutrients.kohlenhydrate += zutat.lebensmittel.nutrients?.kohlenhydrate || 0
  return multiplyNutrients(nutrients, zutat.menge / 100)
}

export function kochschrittReducer(currentValue: KochschrittSummary, kochschritt: Kochschritt) {
  const berechneteArbeitszeit = currentValue.berechneteArbeitszeit + (kochschritt?.arbeitszeit || 0)
  const berechneteGesamtdauer = currentValue.berechneteGesamtdauer + (kochschritt?.gesamtdauer || (berechneteArbeitszeit + (kochschritt.wartezeit || 0)))
  const zutaten = kochschritt.zutaten.reduce(zutatenReducer, currentValue.zutaten)
  const utensilien = kochschritt.utensilien.reduce(utensilienReducer, currentValue.utensilien)
  const nutrients: Nutrients = kochschritt.zutaten.reduce(nutrientsReducer, currentValue.nutrients)

  return {
    berechneteArbeitszeit,
    berechneteGesamtdauer,
    zutaten,
    utensilien,
    nutrients
  }
}


