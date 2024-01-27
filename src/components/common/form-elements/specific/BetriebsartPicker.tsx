import React from "react";
import {FormGroup, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Field, useField} from "formik";
import {Betriebsart} from "../../../../shared-types/enum";
import {BetriebsartenProperties} from "../../../../util/format/enum-properties/BetriebsartenProperties";

type BetriebsartPickerProps = {
  name: string,
  label?: string,
}

/**
 * @see KochschrittForm
 */
export function BetriebsartPicker({name}: BetriebsartPickerProps): React.ReactElement {

  const [{value}, , {setValue}] = useField<Betriebsart>(name);

  const handleChange = async (e: SelectChangeEvent<typeof value>) => {
    const newValue = Object.values(Betriebsart).find(o => o === e.target.value)
    if (newValue)
      await setValue(newValue)
  }
  const selectOptions: React.ReactElement[] = []
  Object.values(Betriebsart).forEach((betriebsart,index) => {
    selectOptions.push(<MenuItem key={index} value={betriebsart}>{BetriebsartenProperties[betriebsart].fullName}</MenuItem>)
  })

  return (<FormGroup>
    <Field
      fullWidth
      multiple={false}
      as={Select}
      size={'small'}
      value={value}
      onChange={handleChange}
      name={name}
    >
      {selectOptions}
    </Field>
  </FormGroup>)
}
