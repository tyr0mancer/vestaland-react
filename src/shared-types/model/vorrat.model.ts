import {Benutzer} from "./Benutzer";
import {Lebensmittel} from "./Lebensmittel";
import {Lagerort} from "./lagerort.model";
import {Einheit} from "../enum";
import {Ref, TimeStamps} from "../model-helper";

export class Vorrat extends TimeStamps {
  public besitzer?: Ref<Benutzer>;
  public lagerort?: Ref<Lagerort>;
  public lebensmittel?: Ref<Lebensmittel>;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
  public haltbarBis?: Date;
}

