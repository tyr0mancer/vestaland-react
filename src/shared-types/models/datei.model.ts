import {Benutzer} from "./Benutzer";
import {TimeStamps, Ref} from "./types";

export class Datei extends TimeStamps {
  public fileName: string = '';
  public fileNameOriginal: string = '';
  public name: string = '';
  public beschreibung?: string;
  public uploadedBy?: Ref<Benutzer>;
}
