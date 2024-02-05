import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Nutrients} from "../../../shared-types/models/Nutrients";
import {KochschrittSummary} from "./types";
import {kochschrittReducer} from "./kochschritt-reducer";

export function getKochschrittSummary(kochschritte: Kochschritt[]): KochschrittSummary {
  return kochschritte.reduce(kochschrittReducer, {
    berechneteArbeitszeit: 0,
    berechneteGesamtdauer: 0,
    zutaten: [],
    utensilien: [],
    nutrients: new Nutrients()
  })
}
