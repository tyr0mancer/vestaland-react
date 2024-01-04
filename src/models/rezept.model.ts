import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Benutzer} from "./benutzer.model";
import {Datei} from "./datei.model";

export class KochschrittMeta {
  public temperatur?: number;
  public hitze?: string;
}

export class Kochschritt {

  public aktion?: KochschrittAktion;
  public beschreibung?: string;
  public videoUrl?: string;
  public repeating?: boolean;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public meta?: KochschrittMeta;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];

  //@todo remove
  public name: string = "";
}

export class RezeptMeta {
  public vegetarisch?: boolean;
  public healthy?: boolean;
  public soulfood?: boolean;
}

export class Rezept {
  public _id?: string;
  public name: string = '';
  public quelleUrl: string[] = [];
  public beschreibung?: string;
  public portionen: number = 1;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public autor?: Benutzer;
  public bild?: Datei;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
}

export class KochschrittAktion {
  public aktionName: string = '';
  public aktionIcon?: string;
}
