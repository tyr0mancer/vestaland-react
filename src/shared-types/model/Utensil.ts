import {UtensilType} from "./utensil.schema";
import {CustomOwnership} from "./CustomOwnership";

export class Utensil extends CustomOwnership implements UtensilType {
  public utensilName: string = "";
  public beschreibung?: string;
  public volumen?: number;
}
