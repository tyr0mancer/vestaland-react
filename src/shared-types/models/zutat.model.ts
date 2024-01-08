import {Lebensmittel} from "./lebensmittel.model";
import {Ref} from "./types";
import {Einheit} from "../enum";

export class Zutat {
  public lebensmittel?: Ref<Lebensmittel>;
  public freitext?: string;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
}

