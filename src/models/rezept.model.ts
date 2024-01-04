import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Benutzer} from "./benutzer.model";
import {Datei} from "./datei.model";
import {Ref, TimeStamps} from "./types";
import {Kochschritt} from "./kochschritt.model";


export interface RezeptMeta {
  vegetarisch?: boolean;
  healthy?: boolean;
  soulfood?: boolean;
}

export class Rezept extends TimeStamps {
  public name: string = '';
  public beschreibung?: string;
  public freitext?: string;
  public quelleUrl: string[] = [];
  public berechneteGesamtdauer?: number;
  public berechneteArbeitszeit?: number;
  public realeGesamtzeit?: number;
  public autor?: Ref<Benutzer>;
  public bild?: Ref<Datei>;
  public zutaten: Zutat[] = [];
  public hilfsmittel: Ref<Hilfsmittel>[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
  public portionen: number = 1;
}
