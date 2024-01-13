import {Benutzer} from "./Benutzer";
import {Ref, TimeStamps} from "../model-helper";

export class Lagerort extends TimeStamps {
  public name: string = "";
  public besitzer?: Ref<Benutzer>;
  public beschreibung?: string;
}
