import React from "react";
import {Chip} from "@mui/material";

import {TagProperties} from "../../../../shared-types/enum/TagProperties";
import {Tag} from "../../../../shared-types/enum";
import {CustomSelectMultiple} from "../generic";


type TagsPickerProps = {
  name: string,
  label?: string
}

/**
 * TS Doc Info
 * @component TagsPicker
 */
export function TagsPicker({name, label = 'Tag auswählen'}: TagsPickerProps): React.ReactElement {
  return (<CustomSelectMultiple<Tag>
    size={'small'}
    name={name}
    label={label}
    options={Object.values(Tag)}
    getKey={(tag: Tag) => tag}
    getLabel={(tag: Tag) => <Chip label={TagProperties[tag].label} sx={{bgcolor: TagProperties[tag].color}}/>}
  />)
}
