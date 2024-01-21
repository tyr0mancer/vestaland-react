
//@Hausarbeit
//@todo testen: immutability, performance, wartbarkeit hier vs new T(), also als constructor (was macht TS compiler daraus?)
import {Rezept} from "../../shared-types/models/Rezept";
import {Zutat} from "../../shared-types/models/Zutat";
import {createRandomId} from "../../shared-types/models/_default";
import {Kochschritt} from "../../shared-types/models/Kochschritt";
import {Einheit} from "../../shared-types/enum";
import {Lebensmittel} from "../../shared-types/models/Lebensmittel";

/**
 * Stellt Default-Werte - insbesondere für den Rezept-Editor - bereit
 *
 * @see RezeptEdit
 */
export const DefaultValues = {
  rezept: new Rezept(),
  zutat: new Zutat(),

  kochschritt: {
    _id: createRandomId(8),
    zutaten: [new Zutat()],
    utensilien: [],
    aktionen: [],
    erforderlicheErgebnisse: []
  } as Kochschritt,
  lebensmittel: {
    name: '',
    defaultEinheit: Einheit.ST,
    haendlerGruppen: []
  } as Lebensmittel
}
