import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Benutzer} from "./benutzer.model";
import {Datei} from "./datei.model";

export class KochschrittMeta {
  public temperatur?: number;
  public hitze?: string;
}

export class Kochschritt {
  public name: string = "";
  public beschreibung?: string;
  public dauer?: number;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public meta?: KochschrittMeta;
}


export class RezeptMeta {
  public vegetarisch?: boolean;
  public healthy?: boolean;
}

export class Rezept {
  public _id?: string;
  public name: string = '';
  public beschreibung?: string;
  public portionen: number = 1;
  public author?: Benutzer;
  public bild?: Datei;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
}
