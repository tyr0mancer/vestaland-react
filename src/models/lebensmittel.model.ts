import {Einheit} from "../services/einheitenService";
import {TimeStamps} from "./types";


export class Nutrients {
  public proteine?: number
  public fett?: number
  public kohlenhydrate?: number
  public zucker?: number
  public ballaststoffe?: number
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


