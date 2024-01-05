import { Betriebsart } from "../shared-types/types";

type BetriebsartProperty = {
  fullName: string;
  variant: Betriebsart;
};

export const BetriebsartenProperties: { [key in Betriebsart]: BetriebsartProperty } = {
  [Betriebsart.TK]: {fullName: 'Gefrierschrank', variant: Betriebsart.TK},
  [Betriebsart.FRIDGE]: {fullName: 'im Kühlschrank', variant: Betriebsart.TK},
  [Betriebsart.ZIMMER]: {fullName: 'Zimmertemperatur', variant: Betriebsart.TK},
  [Betriebsart.HITZE_NIEDRIG]: {fullName: 'Niedrige Hitze', variant: Betriebsart.TK},
  [Betriebsart.HITZE_MITTEL]: {fullName: 'Mittlerer Hitze', variant: Betriebsart.TK},
  [Betriebsart.OBER_UNTER]: {fullName: 'Ober/Unter-Hitze', variant: Betriebsart.TK},
  [Betriebsart.UMLUFT]: {fullName: 'Umluft', variant: Betriebsart.TK},

} as const; // for immutability
