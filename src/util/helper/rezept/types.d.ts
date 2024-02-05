import {Zutat} from "../../../shared-types/models/Zutat";
import {Utensil} from "../../../shared-types/models/Utensil";
import {Nutrients} from "../../../shared-types/models/Nutrients";

type KochschrittSummary = {
  berechneteArbeitszeit: number,
  berechneteGesamtdauer: number,
  zutaten: Zutat[],
  utensilien: Utensil[],
  nutrients: Nutrients
}
