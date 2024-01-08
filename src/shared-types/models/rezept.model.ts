import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {Datei} from "./Datei";
import {Benutzer} from "./Benutzer";
import {Kochschritt} from "./Kochschritt";
import {Nutrients} from "./Nutrients";
import {Ref, TimeStamps} from "./types";


export class RezeptMeta {
  public vegetarisch?: boolean;
  public healthy?: boolean;
  public soulfood?: boolean;
  public schwierigkeitsgrad?: number;
}

export class Rezept extends TimeStamps {
  public name: string = '';
  public beschreibung?: string;
  public freitext?: string;
  public quelleUrl: string[] = [];
  public berechneteGesamtdauer?: number;
  public berechneteArbeitszeit?: number;
  public extraZeitExtraPortion?: number;
  public realeGesamtzeit?: number;
  public autor?: Ref<Benutzer>;
  public bild?: Ref<Datei>;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
  public kochschritte: Kochschritt[] = [];
  public meta?: RezeptMeta;
  public portionen: number = 1;
  public nutrients?: Nutrients;
}
