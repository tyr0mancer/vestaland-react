import React from "react";
import {FormGroup, ListSubheader, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Field, useField} from "formik";
import {
  Einheit,
  EinheitenGroups,
  EinheitProperties
} from "../../../../shared-types/enum";
import {Lebensmittel} from "../../../../shared-types/models/Lebensmittel";

type EinheitPickerProps = {
  name: string,
  label?: string,
  menge?: number,
  einheit?: Einheit,
  lebensmittel?: Lebensmittel
}

/**
 * TS Doc Info
 * @component EinheitPicker
 */
export function EinheitPicker({name}: EinheitPickerProps): React.ReactElement {

  const [{value}, , {setValue}] = useField<Einheit>(name);

  const handleChange = async (e: SelectChangeEvent<typeof value>) => {
    const newValue = Object.values(Einheit).find(o => o === e.target.value)
    if (newValue)
      await setValue(newValue)
  }
  const selectOptions: React.ReactElement[] = []
  EinheitenGroups.forEach(gruppe => {
    selectOptions.push(<ListSubheader key={gruppe.gruppenName}>{gruppe.gruppenName}</ListSubheader>)
    Object.values(Einheit).filter(e => EinheitProperties[e].variant === gruppe.variant).forEach(e => {
      selectOptions.push(<MenuItem key={e} value={e}>{EinheitProperties[e].fullName}</MenuItem>)
    })
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
