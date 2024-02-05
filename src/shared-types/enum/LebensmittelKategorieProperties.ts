import { LebensmittelKategorie } from "./index";

export type LebensmittelKategorieProperty = {
  fullName: string;
  shortName?: string;
  icon?: string;
};

export const LebensmittelKategorieProperties: { [key in LebensmittelKategorie]: LebensmittelKategorieProperty } = {
  [LebensmittelKategorie.Milchprodukte]: {fullName: 'Milch'},
  [LebensmittelKategorie.OEL]: {fullName: 'Öl'},
  [LebensmittelKategorie.Mehl]: {fullName: 'Mehl'},
  [LebensmittelKategorie.Essig]: {fullName: 'Essig'},
  [LebensmittelKategorie.Rindfleisch]: {fullName: 'Rind'},
  [LebensmittelKategorie.Schweinefleisch]: {fullName: 'Schwein'},
  [LebensmittelKategorie.Pasta]: {fullName: 'Pasta'},
  [LebensmittelKategorie.Kartoffeln]: {fullName: 'Kartoffeln'},
  [LebensmittelKategorie.Kaese]: {fullName: 'Käse'},
  [LebensmittelKategorie.Saucen]: {fullName: 'Saucen'}
} as const

