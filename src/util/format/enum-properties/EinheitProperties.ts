import { Einheit } from "../../../shared-types/enum";

export type EinheitProperty = {
  fullName: string;
  shortName: string;
  variant: Einheit;
  base: number;
};

export const EinheitProperties: { [key in Einheit]: EinheitProperty } = {
  [Einheit.ST]: {shortName: '', fullName: 'Stück', variant: Einheit.ST, base: 1},
  [Einheit.DZ]: {shortName: 'Dtzd.', fullName: 'Dutzend', variant: Einheit.ST, base: 12},
  [Einheit.G]: {shortName: 'g', fullName: 'Gram', variant: Einheit.G, base: 1},
  [Einheit.KG]: {shortName: 'kg', fullName: 'Kilogram', variant: Einheit.G, base: 1000},
  [Einheit.LB]: {shortName: 'lbs', fullName: 'Pound', variant: Einheit.G, base: 454},
  [Einheit.ML]: {shortName: 'ml', fullName: 'Milliliter', variant: Einheit.ML, base: 1},
  [Einheit.L]: {shortName: 'l', fullName: 'Liter', variant: Einheit.ML, base: 1000},
  [Einheit.TL]: {shortName: 'TL', fullName: 'Teelöffel', variant: Einheit.ML, base: 5},
  [Einheit.EL]: {shortName: 'EL', fullName: 'Esslöffel', variant: Einheit.ML, base: 15},
  [Einheit.CP]: {shortName: 'cup', fullName: 'US Cup', variant: Einheit.ML, base: 236},
} as const

