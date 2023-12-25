import {Benutzer} from "./benutzer.model";

// @todo class extends TimeStamps ?
export class Datei  {

  public fileName: string = '';
  public fileNameOriginal: string = '';
  public name: string = '';
  public beschreibung?: string;
  public uploadedBy?: Benutzer;
}
