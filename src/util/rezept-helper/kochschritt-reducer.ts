import {Zutat} from "../../shared-types/model/Zutat";
import {Utensil} from "../../shared-types/model/Utensil";
import {Kochschritt} from "../../shared-types/model/Kochschritt";
import {Nutrients} from "../../shared-types/model/Nutrients";


interface KochschrittSummary {
  berechneteArbeitszeit: number,
  berechneteGesamtdauer: number,
  zutaten: Zutat[],
  utensilien: Utensil[],
  nutrients: Nutrients
}


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
  return kochschritte.reduce(kochschrittReducer, {
    berechneteArbeitszeit: 0,
    berechneteGesamtdauer: 0,
    zutaten: [],
    utensilien: [],
    nutrients: new Nutrients()
  })
}

export function multiplyNutrients(nutrients: Nutrients, factor: number): Nutrients {
  nutrients.kalorien = nutrients.kalorien * factor
  nutrients.proteine = nutrients.proteine * factor
  nutrients.fett = nutrients.fett * factor
  nutrients.kohlenhydrate = nutrients.kohlenhydrate * factor
  nutrients.zucker = nutrients.zucker * factor
  nutrients.ballaststoffe = nutrients.ballaststoffe * factor

  return nutrients
}
