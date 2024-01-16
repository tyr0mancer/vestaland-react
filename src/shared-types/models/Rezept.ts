import {RezeptType} from "../schemas/rezept-schema";
import {TimeStamps} from "./_Timestamps";
import {Ref} from "../types";
import {Tags} from "../enum";

import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {Datei} from "./Datei";
import {Kochschritt} from "./Kochschritt";
import {Nutrients} from "./Nutrients";


export class Rezept extends TimeStamps implements RezeptType {
  public name: string = '';
  public beschreibung?: string;
  public freitext?: string;
  public quelleUrl: string[] = []
  public realeGesamtdauer?: number;
  public realeArbeitszeit?: number;
  public berechneteGesamtdauer?: number;
  public berechneteArbeitszeit?: number;
  public extraPortionArbeitszeit?: number;
  public extraPortionGesamtdauer?: number;
  public bild?: Ref<Datei>;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
  public kochschritte: Kochschritt[] = [];
  public tags: Tags[] = [];
  public schwierigkeitsgrad?: number;
  public portionen: number = 1;
  public nutrients?: Nutrients;
}
