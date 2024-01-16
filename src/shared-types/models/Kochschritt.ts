import {Ref} from "../types";
import {KochschrittType} from "../schemas/kochschritt-schema";
import {Betriebsart} from "../enum";

import {KochschrittAktion} from "./KochschrittAktion";
import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";


export class Kochschritt implements KochschrittType {
  public aktionen: Ref<KochschrittAktion>[] = [];
  public beschreibung?: string;
  public videoUrl?: string;
  public gesamtdauer?: number;
  public betriebsart?: Betriebsart;
  public temperatur?: number; //  Grad Celsius
  public arbeitszeit?: number;
  public wartezeit?: number;
  public wartenErforderlich?: boolean;
  public resultatName?: string;
  public erforderlicheKochschritte?: string[] = [];
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
}
