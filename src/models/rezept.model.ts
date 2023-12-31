import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Benutzer} from "./benutzer.model";
import {Datei} from "./datei.model";

export class KochschrittMeta {
  public temperatur?: number;
  public hitze?: string;
}

export enum KochschrittTypus {
  FREITEXT = '',
  SCHNEIDEN = 'schneiden',
  AUFHEIZEN = 'aufheizen',
  BRATEN = 'braten',
  HEISS_BRATEN = 'scharf anbraten',
  PUTZEN = 'putzen',
}


export class Kochschritt {
  public name: string = "";
  public typus: KochschrittTypus = KochschrittTypus.FREITEXT;

  public beschreibung?: string;
  public videoUrl?: string;
  public repeating?: boolean;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public meta?: KochschrittMeta;
}

export class RezeptMeta {
  public vegetarisch?: boolean;
  public healthy?: boolean;
  public soulfood?: boolean;
}

export class Rezept {
  public _id?: string;
  public name: string = '';
  public quelleUrl?: string;
  public beschreibung?: string;
  public portionen: number = 1;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public author?: Benutzer;
  public bild?: Datei;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Hilfsmittel[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
}
