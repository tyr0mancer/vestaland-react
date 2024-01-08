import {Einheit} from "../enum";
import {Lebensmittel} from "./lebensmittel.model";
import {Lagerort} from "./lagerort.model";
import {Benutzer} from "./Benutzer";
import {Ref, TimeStamps} from "./types";

export class Vorrat extends TimeStamps {
  public besitzer?: Ref<Benutzer>;
  public lagerort?: Ref<Lagerort>;
  public lebensmittel?: Ref<Lebensmittel>;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
  public haltbarBis?: Date;
}
