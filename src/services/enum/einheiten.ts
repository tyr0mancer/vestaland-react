import { Einheit } from "../../shared-types/types";

type EinheitProperty = {
  fullName: string;
  variant: Einheit;
  base: number;
};

export const EinheitProperties: { [key in Einheit]: EinheitProperty } = {
  [Einheit.ST]: {fullName: 'Stück', variant: Einheit.ST, base: 1},
  [Einheit.DZ]: {fullName: 'Dutzend', variant: Einheit.ST, base: 12},
  [Einheit.G]: {fullName: 'Gram', variant: Einheit.G, base: 1},
  [Einheit.KG]: {fullName: 'Kilogram', variant: Einheit.G, base: 1000},
  [Einheit.LB]: {fullName: 'Pound', variant: Einheit.G, base: 454},
  [Einheit.ML]: {fullName: 'Milliliter', variant: Einheit.ML, base: 1},
  [Einheit.L]: {fullName: 'Liter', variant: Einheit.ML, base: 1000},
  [Einheit.TL]: {fullName: 'Teelöffel', variant: Einheit.ML, base: 5},
  [Einheit.EL]: {fullName: 'Esslöffel', variant: Einheit.ML, base: 15},
  [Einheit.CP]: {fullName: 'US Cup', variant: Einheit.ML, base: 236},

} as const

