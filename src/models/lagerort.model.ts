import {Ref, TimeStamps} from "./types";
import {Benutzer} from "./benutzer.model";

export class Lagerort extends TimeStamps {
  public name: string = "";
  public besitzer?: Ref<Benutzer>;
  public beschreibung?: string;
}
