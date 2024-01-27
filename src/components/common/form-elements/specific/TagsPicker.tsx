import React from "react";
import {Chip} from "@mui/material";

import {TagProperties} from "../../../../util/format/enum-properties/TagProperties";
import {Tags} from "../../../../shared-types/enum";
import {CustomSelectMultiple} from "../generic";


type TagsPickerProps = {
  name: string,
  label?: string
}

/**
 * TS Doc Info
 * @component TagsPicker
 */
export function TagsPicker({name, label = 'Tags auswählen'}: TagsPickerProps): React.ReactElement {
  return (<CustomSelectMultiple<Tags>
    size={'small'}
    name={name}
    label={label}
    options={Object.values(Tags)}
    getKey={(tag: Tags) => tag}
    getLabel={(tag: Tags) => <Chip label={TagProperties[tag].label} sx={{bgcolor: TagProperties[tag].color}}/>}
  />)
}
