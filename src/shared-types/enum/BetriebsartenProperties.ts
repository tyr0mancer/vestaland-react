import { Betriebsart } from "./index";

export type BetriebsartProperty = {
  fullName: string;
};

export const BetriebsartenProperties: { [key in Betriebsart]: BetriebsartProperty } = {
  [Betriebsart.TK]: {fullName: 'Gefrierschrank'},
  [Betriebsart.KUEHLSCHRANK]: {fullName: 'im Kühlschrank'},
  [Betriebsart.ZIMMERTEMPERATUR]: {fullName: 'bei Zimmertemperatur'},
  [Betriebsart.HITZE_NIEDRIG]: {fullName: 'Niedrige Hitze'},
  [Betriebsart.HITZE_MITTEL]: {fullName: 'Mittlerer Hitze'},
  [Betriebsart.OBER_UNTER]: {fullName: 'Ober/Unter-Hitze'},
  [Betriebsart.UMLUFT]: {fullName: 'Umluft'},

} as const

