import React from "react";
import {Field} from "formik";
import {MenuItem, Select} from "@mui/material";
import {AktionIcon} from "../../../../shared-types/enum";
import {AktionIconImage} from "../../viewer/AktionIconImage";

type IconPickerProps = {
  name: string
}

/**
 * TS Doc Info
 * @component IconPicker
 */
export function IconPicker({name}: IconPickerProps): React.ReactElement {
  return (<Field
    as={Select}
    name={name}
  >
    {Object.entries(AktionIcon).map(([key, value]) =>
      <MenuItem key={key} value={value}><AktionIconImage aktionIcon={value}/></MenuItem>)}
  </Field>)
}
