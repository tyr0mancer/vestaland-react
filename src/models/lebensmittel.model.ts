export class Lebensmittel {
  public _id?: string;
  public kategorie?: string
  public name: string = ""
  public nameDetail?: string
  public nameSingular?: string
  public beschreibung?: string
  public defaultUnit: string = "St"

  // Gramm pro Kubikzentimeter bzw kg pro Liter
  // Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl, etwa 0,7 kg wiegt.
  public density?: number
  public unitWeight?: number
}
