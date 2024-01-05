import {Lebensmittel} from "./lebensmittel.model";
import {Einheit} from "../shared-types/types";
import {Ref} from "./types";

export class Zutat {
  public lebensmittel?: Ref<Lebensmittel>;
  public freitext?: string;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
}

