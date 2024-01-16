import {Benutzer} from "./Benutzer";
import {TimeStamps} from "./_Timestamps";
import {Ref} from "../types";

/**
 * Helfer Klasse um Ownership einzelner Dokumente zu handhaben
 */
export class CustomOwnership extends TimeStamps {
  public owner?: Ref<Benutzer>;
  public publicVisible?: boolean = false;
}
