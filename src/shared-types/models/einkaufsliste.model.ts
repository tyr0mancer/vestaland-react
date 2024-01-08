import {Benutzer} from "./Benutzer";
import {Zutat} from "./Zutat";
import {Ref, TimeStamps} from "./types";
import {Rezept} from "./rezept.model";

export class EinkaufslisteEintrag {
  public zutaten: Zutat[] = [];
  public rezept?: Ref<Rezept>;
  public zuKaufenBis?: Date;
  public wichtigkeit: number = 1;
}

export class Einkaufsliste extends TimeStamps {
  public name: string = "";
  public beschreibung?: string;
  public owner?: Ref<Benutzer>;
  public sharedWith?: Ref<Benutzer>[];
  public eintraege: EinkaufslisteEintrag[] = [];
}

