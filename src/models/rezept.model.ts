import {Zutat} from "./zutat.model";
import {Utensil} from "./utensil.model";
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
  public beschreibung?: string = '';
  public freitext?: string = '';
  public quelleUrl: string[] = [];
  public berechneteGesamtdauer: number = 0;
  public berechneteArbeitszeit: number = 0;
  public realeGesamtzeit?: number;
  public autor?: Ref<Benutzer>;
  public bild?: Ref<Datei>;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
  public portionen: number = 1;
}
