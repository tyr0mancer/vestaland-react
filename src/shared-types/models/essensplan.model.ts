import {Benutzer} from "./Benutzer";
import {Rezept} from "./rezept.model";
import {Ref, TimeStamps} from "./types";

export class EssensplanEintrag {
  public rezept?: Ref<Rezept>;
  public zuKaufenBis?: Date;
}

export class Essensplan extends TimeStamps {
  public name: string = "";
  public owner?: Ref<Benutzer>;
  public beschreibung?: string;
  public eintraege: EssensplanEintrag[] = [];
}
