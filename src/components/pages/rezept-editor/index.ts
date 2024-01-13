import {RezeptEditor} from "./RezeptEditor";
import {Kochschritt} from "../../../shared-types/model/Kochschritt";
import {Rezept} from "../../../shared-types/model/Rezept";
import {Zutat} from "../../../shared-types/model/Zutat";

const DefaultValues = {
  kochschritt: {zutaten: [new Zutat()], utensilien: [], aktionen: []} as Kochschritt,
  rezept: new Rezept()
}

export {RezeptEditor, DefaultValues}
