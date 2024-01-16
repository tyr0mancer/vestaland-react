import {Ref} from "../types";
import {Benutzer} from "./Benutzer";
import {Lebensmittel} from "./Lebensmittel";
import {Lagerort} from "./Lagerort";
import {Einheit} from "../enum";
import {CustomOwnership} from "./_CustomOwnership";
import {VorratType} from "../schemas/vorrat-schema";


export class Vorrat extends CustomOwnership implements VorratType {
  public besitzer?: Ref<Benutzer>;
  public lagerort?: Ref<Lagerort>;
  public lebensmittel?: Ref<Lebensmittel>;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
  public haltbarBis?: Date;
}


