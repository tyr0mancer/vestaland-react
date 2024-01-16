import {Benutzer} from "./Benutzer";
import {Rezept} from "./Rezept";
import {EssensplanType} from "../schemas/essensplan-schema";
import {CustomOwnership} from "./_CustomOwnership";
import {Ref} from "../types";

export class EssensplanEintrag {
  public rezept?: Ref<Rezept>;
  public zuKaufenBis?: Date;
}

export class Essensplan extends CustomOwnership implements EssensplanType {
  public name: string = "";
  public owner?: Ref<Benutzer>;
  public beschreibung?: string;
  public eintraege: EssensplanEintrag[] = [];
}

