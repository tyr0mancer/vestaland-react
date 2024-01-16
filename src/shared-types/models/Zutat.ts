import {Lebensmittel} from "./Lebensmittel";
import {Einheit} from "../enum";
import {ZutatType} from "../schemas/zutat-schema";
import {Ref} from "../types";

export class Zutat implements ZutatType {
  public lebensmittel?: Ref<Lebensmittel>;
  public freitext?: string;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
}

