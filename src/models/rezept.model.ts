import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Benutzer} from "./benutzer.model";
import {Datei} from "./datei.model";

export class Aktion {
  public name: string = "";
  public beschreibung?: string;
  public temperatur?: number;
  public hitze?: string;
  public dauer?: number;
}

export class Arbeitsschritt {
  public aktion?: Aktion;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[]= [];
  public dauer?: number;
}

export class Rezept {
  public _id?: string;
  public name: string = '';
  public beschreibung?: string;
  public author?: Benutzer;
  public bild?: Datei;

  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public arbeitsschritte: Arbeitsschritt[] = [];
  public portionen: number = 1;
}
