import {Utensil} from "./utensil.model";
import {Ref} from "./types";
import {Zutat} from "./zutat.model";
import {KochschrittAktion} from "./kochschritt-aktion.model";

interface KochschrittMeta {
  temperatur?: number;
  hitze?: string;
}


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
  public meta?: KochschrittMeta;
}
