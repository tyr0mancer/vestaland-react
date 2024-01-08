import {Benutzer} from "./Benutzer";
import {TimeStamps, Ref} from "./types";

export class Datei extends TimeStamps {
  public dateiNameServer: string = '';
  public dateiNameOriginal: string = '';
  public beschreibung?: string;
  public uploadedBy?: Ref<Benutzer>;
}
