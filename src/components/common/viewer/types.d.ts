import {Utensil} from "../../../shared-types/models/Utensil";

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

