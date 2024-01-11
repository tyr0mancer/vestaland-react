import React from "react";
import {Field} from "formik";
import {Card, MenuItem, Select} from "@mui/material";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";

interface VoraussetzungPickerProps {
  name: string,
  values?: string[],
  options: Kochschritt[]
}

/**
 * TS Doc Info
 * @component VoraussetzungPicker
 */
export function ZwischenergebnisPicker({
                                         name,
                                         options = []
                                       }: VoraussetzungPickerProps): React.ReactElement {

  return (<Card>
    <Field
      fullWidth
      multiple={true}
      as={Select}
      name={`${name}`}
      labelId="Voraussetzung"
    >
      {options.filter(o => !!o.resultatName).map((option, index) =>
        <MenuItem key={index} value={option.resultatName}>{option.resultatName}</MenuItem>)}
    </Field>
  </Card>)
}
