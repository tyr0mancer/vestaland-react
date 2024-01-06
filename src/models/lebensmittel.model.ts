import {TimeStamps} from "./types";
import {Einheit} from "../shared-types/types";


export class Nutrients {
  public kalorien: number = 0;
  public proteine: number = 0
  public fett: number = 0
  public kohlenhydrate: number = 0
  public zucker: number = 0
  public ballaststoffe: number = 0
}


export class Lebensmittel extends TimeStamps {
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
  public nutrients?: Nutrients
}


