import {Einheit} from "./index";

//@Hausarbeit
export type EinheitProperty = {
  fullName: string;
  shortName: string;
  variant: Einheit;
  base: number;
  einheit?: Einheit;
};

export const EinheitProperties: { [key in Einheit]: EinheitProperty } = {
  [Einheit.ST]: {shortName: 'St', fullName: 'Stück', variant: Einheit.ST, base: 1},
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


export const EinheitenGroups = [
  {
    variant: Einheit.ST,
    gruppenName: 'Anzahl'
  },
  {
    variant: Einheit.G,
    gruppenName: 'Gewicht'
  },
  {
    variant: Einheit.ML,
    gruppenName: 'Volumen'
  },
]


/*
// (Alternative Approach: generate pseudo Enum from Array)
const fruits = ['Apple', 'Banana', 'Cherry'] as const;
type Fruit = typeof fruits[number];
const FruitEnum = fruits.reduce((obj, fruit) => {
  obj[fruit] = fruit;
  return obj;
}, {} as Record<Fruit, string>);
console.log(FruitEnum.Apple)

*/
