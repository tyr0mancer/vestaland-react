import { AktionIcon } from "../../shared-types/types";

type AktionIconProperty = {
  fullName?: string;
  icon: string;
};

export const AktionIconProperties: { [key in AktionIcon]: AktionIconProperty } = {
  [AktionIcon.DUMMY]: {icon: 'dummy.png'},
  [AktionIcon.MESSER]: {icon: 'messer.png'},
  [AktionIcon.SCHNEEBESEN]: {icon: 'schneebesen.png'},
  [AktionIcon.NUDELHOLZ]: {icon: 'nudelholz.png'},
  [AktionIcon.PFANNE]: {icon: 'pfanne.png'},
  [AktionIcon.TOPF]: {icon: 'topf.png'},
  [AktionIcon.OFEN]: {icon: 'ofen.png'},
  [AktionIcon.UHR]: {icon: 'uhr.png'},

} as const
