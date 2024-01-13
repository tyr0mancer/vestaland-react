import {Lebensmittel} from "./Lebensmittel";
import {Einheit} from "../enum";
import {ZutatType} from "./zutat.schema";
import {Ref} from "../model-helper";

export class Zutat implements ZutatType {
  public lebensmittel?: Ref<Lebensmittel>;
  public freitext?: string;
  public einheit: Einheit = Einheit.ST;
  public menge: number = 1;
}

