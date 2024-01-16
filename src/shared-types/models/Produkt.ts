import {Ref} from "../types";
import {ProduktType} from "../schemas/produkt-schema";
import {Einheit, HaendlerGruppe} from "../enum";

import {Haendler} from "./Haendler";
import {Lebensmittel} from "./Lebensmittel";

export class Produkt implements ProduktType {
  public freitext?: string;
  public lebensmittel?: Ref<Lebensmittel>;
  public menge: number = 1;
  public einheit: Einheit = Einheit.ST
  public barcode?: string;
  public ladenTyp: HaendlerGruppe[] = [];
  public ladenListe: Ref<Haendler>[] = [];
}
