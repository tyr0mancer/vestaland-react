import {Utensil} from "../../../shared-types/models/Utensil";
import {KochschrittAktion} from "../../../shared-types/models/KochschrittAktion";

type AktionenViewerProps = {
  aktionen: KochschrittAktion[]
}

type UrlViewerProps = {
  url?: string
}

type UtensilienViewerProps = {
  utensilien?: Utensil[]
}

type UtensilViewerProps = {
  utensil?: Utensil
}

type ZeitenViewerProps = {
  arbeitszeit?: number,
  wartezeit?: number,
  gesamtdauer?: number,
}

