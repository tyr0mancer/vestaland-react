import {Zutat} from "./Zutat";
import {Rezept} from "./Rezept";
import {Benutzer} from "./Benutzer";
import {EinkaufslistenEintragType, EinkaufslisteType} from "../schemas/einkaufsliste-schema";
import {CustomOwnership} from "./_CustomOwnership";
import {Produkt} from "./Produkt";
import {Ref} from "../types";

export class EinkaufslisteEintrag implements EinkaufslistenEintragType {
  public zutat?: Zutat;
  public produkt?: Produkt;
  public rezept?: Ref<Rezept>;
  public zuKaufenBis?: Date;
  public wichtigkeit: number = 1;
  public istAustauschOK: boolean = true;
  public ladenGruppe?: string;
}

export class Einkaufsliste extends CustomOwnership implements EinkaufslisteType {
  public listenName: string = "";
  public beschreibung?: string;
  public sharedWith: Ref<Benutzer>[] = [];
  public eintraege: EinkaufslisteEintrag[] = [];
}
