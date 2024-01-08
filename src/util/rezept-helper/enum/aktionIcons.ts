import { AktionIcon } from "../../../shared-types/types";

export type AktionIconProperty = {
  fullName?: string;
  icon: string;
};

export const AktionIconProperties: { [key in AktionIcon]: AktionIconProperty } = {
  [AktionIcon.DUMMY]: {icon: 'dummy.png'},
  [AktionIcon.WASCHEN]: {icon: 'waschen.png'},
  [AktionIcon.BLENDER]: {icon: 'blender.png'},
  [AktionIcon.GRILL]: {icon: 'grill.png'},
  [AktionIcon.KOCHEN]: {icon: 'kochen.png'},
  [AktionIcon.MESSER]: {icon: 'messer.png'},
  [AktionIcon.NUDELHOLZ]: {icon: 'nudelholz.png'},
  [AktionIcon.SCHNEEBESEN]: {icon: 'schneebesen.png'},
  [AktionIcon.TOPF]: {icon: 'topf.png'},
  [AktionIcon.UHR]: {icon: 'uhr.png'},
  [AktionIcon.PFANNE]: {icon: 'pfanne.png'},
  [AktionIcon.OFEN]: {icon: 'ofen.png'},


} as const

