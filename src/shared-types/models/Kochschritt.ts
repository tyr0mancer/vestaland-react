import {Utensil} from "./Utensil";
import {Ref} from "./types";
import {Zutat} from "./Zutat";
import {KochschrittAktion} from "./KochschrittAktion";
import {Betriebsart} from "../enum";


export class Kochschritt {
  public aktionen: Ref<KochschrittAktion>[] = [];
  public beschreibung?: string;
  public videoUrl?: string;
  public gesamtdauer?: number;
  public betriebsart?: Betriebsart;
  public temperatur?: number; //  Grad Celsius
  public arbeitszeit?: number;
  public wartezeit?: number;
  public erforderlicheKochschritte?: string[];
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
}
