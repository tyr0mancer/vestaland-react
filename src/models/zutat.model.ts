import {Lebensmittel} from "./lebensmittel.model";

export class Zutat {
  public lebensmittel: Lebensmittel = new Lebensmittel();
  public freitext?: string;
  public einheit: string = "St";
  public menge: number = 1;
}
