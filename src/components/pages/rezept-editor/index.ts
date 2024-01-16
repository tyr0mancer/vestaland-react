import {RezeptEditor} from "./RezeptEditor";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Rezept} from "../../../shared-types/models/Rezept";
import {Zutat} from "../../../shared-types/models/Zutat";

const DefaultValues = {
  kochschritt: {zutaten: [new Zutat()], utensilien: [], aktionen: []} as Kochschritt,
  rezept: new Rezept()
}

export {RezeptEditor, DefaultValues}
