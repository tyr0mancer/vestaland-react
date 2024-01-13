import {Benutzer} from "./Benutzer";
import {Ref, TimeStamps} from "../model-helper";

/**
 * Helfer Klasse um Permissions einzelner Dokumente zu handhaben
 */
export class CustomOwnership extends TimeStamps {
  public owner?: Ref<Benutzer>;
  public publicVisible?: boolean = false;
}
