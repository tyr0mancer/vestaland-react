import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {Datei} from "./Datei";
import {Benutzer} from "./Benutzer";
import {Kochschritt} from "./Kochschritt";
import {Nutrients} from "./Nutrients";
import {Ref, TimeStamps} from "./types";
import {Tags} from "../enum/Tags";


export class Rezept extends TimeStamps {
  public name: string = '';
  public beschreibung?: string;
  public freitext?: string;
  public quelleUrl: string[] = [];
  public realeGesamtzeit?: number;
  public berechneteGesamtdauer?: number;
  public berechneteArbeitszeit?: number;
  public realeGesamtdauer?: number;
  public realeArbeitszeit?: number;
  public extraPortionArbeitszeit?: number;
  public extraPortionGesamtdauer?: number;
  public autor?: Ref<Benutzer>;
  public bild?: Ref<Datei>;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
  public kochschritte: Kochschritt[] = [];
  public tags: Tags[] = [];
  public schwierigkeitsgrad?: number;
  public portionen: number = 1;
  public nutrients?: Nutrients;
}
