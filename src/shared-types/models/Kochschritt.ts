import {Utensil} from "./Utensil";
import {Ref} from "./types";
import {Zutat} from "./Zutat";
import {KochschrittAktion} from "./KochschrittAktion";
import {Betriebsart} from "../enum";


export class Kochschritt {
  public aktion?: Ref<KochschrittAktion>;
  public beschreibung?: string;
  public videoUrl?: string;
  public repeating?: boolean;
  public gesamtdauer?: number;
  public arbeitszeit?: number;
  public wartezeit?: number;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];
  public betriebsart?: Betriebsart;
  public temperatur?: number; //  Grad Celsius
}
