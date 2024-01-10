import {Tags} from "../../../shared-types/enum/Tags";

type TagProperty = {
  label: string;
  color: 'green' | 'red' | 'lightblue'
};

export const TagProperties: { [key in Tags]: TagProperty } = {
  [Tags.HEALTHY]: {label: 'gesund', color: 'lightblue'},
  [Tags.SOULFOOD]: {label: 'lecker', color: 'red'},
  [Tags.VEGETARISCH]: {label: 'vegetarisch', color: 'green'},
} as const

