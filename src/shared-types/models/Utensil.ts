import {UtensilType} from "../schemas/utensil-schema";
import {CustomOwnership} from "./_CustomOwnership";

export class Utensil extends CustomOwnership implements UtensilType {
  public utensilName: string = "";
  public beschreibung?: string;
  public volumen?: number;
}
