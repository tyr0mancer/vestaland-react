import {Nutrients} from "./Nutrients";
import {Einheit} from "../enum";
import {LebensmittelType} from "./lebensmittel.schema";
import {CustomOwnership} from "./CustomOwnership";

export class Lebensmittel extends CustomOwnership implements LebensmittelType {
  public kategorie?: string
  public name: string = ""
  public nameDetail?: string
  public nameSingular?: string
  public beschreibung?: string
  public defaultEinheit: Einheit = Einheit.ST
  public defaultMenge?: number

  // Gramm pro Kubikzentimeter bzw kg pro Liter
  // Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl, etwa 0,7 kg wiegt.
  public density?: number
  public unitWeight?: number
  public nutrients?: Nutrients;
}
