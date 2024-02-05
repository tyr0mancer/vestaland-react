import {Tag} from "./Tag";

export type TagProperty = {
  label: string;
  color: 'green' | 'red' | 'lightblue'
};

export const TagProperties: { [key in Tag]: TagProperty } = {
  [Tag.HEALTHY]: {label: 'gesund', color: 'lightblue'},
  [Tag.SOULFOOD]: {label: 'lecker', color: 'red'},
  [Tag.VEGETARISCH]: {label: 'vegetarisch', color: 'green'},
} as const

