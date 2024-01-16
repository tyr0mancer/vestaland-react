import {Ref} from "../types";
import {CustomOwnership} from "./_CustomOwnership";
import {LagerortType} from "../schemas/lagerort-schema";

import {Benutzer} from "./Benutzer";

export class Lagerort extends CustomOwnership implements LagerortType{
  public name: string = "";
  public besitzer?: Ref<Benutzer>;
  public beschreibung?: string;
}
