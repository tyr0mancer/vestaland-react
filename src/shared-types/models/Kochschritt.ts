import {Ref} from "../types";
import {KochschrittType} from "../schemas/kochschritt-schema";
import {Betriebsart} from "../enum";

import {KochschrittAktion} from "./KochschrittAktion";
import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {createRandomId} from "./_default";


export class Kochschritt implements KochschrittType {
  public aktionen: Ref<KochschrittAktion>[] = [];
  public beschreibung?: string;
  public quelleUrl?: string;
  public gesamtdauer?: number;

  public betriebsart?: Betriebsart;
  public temperatur?: number; //  Grad Celsius

  public arbeitszeit?: number;
  public wartezeit?: number;
  public wartenErforderlich?: boolean;
  public zutaten: Zutat[] = [];
  public utensilien: Ref<Utensil>[] = [];


  // zwischenergebnisse
  public _id: string = createRandomId(8);
  public ergebnisName?: string;
  public erforderlicheErgebnisse: string[] = [];
  public totalWeight?: number;
  public totalVolume?: number;

}
