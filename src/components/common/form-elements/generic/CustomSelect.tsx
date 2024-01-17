import React from "react";
import {Field, useField} from "formik";
import {MenuItem, Select} from "@mui/material";
import {CustomSelectProps} from "./types";


/**
 * CustomSelect Komponente - Ein spezialisierter Wrapper um ein MUI Select, integriert mit Formik.
 *
 * @typeParam T - Der Typ der Elemente in der Options-Liste.
 *
 * @param props - Die Props des CustomSelect, definiert in CustomSelectProps.
 * @returns Eine React-Komponente für ein MUI Select mit Formik-Integration.
 *
 * @example
 * <CustomSelect<Lebensmittel>
 *  name={`${name}[lebensmittel]`}
 *  label={'Lebensmittel'}
 *  options={lebensmittel}
 *  getLabel={l => l.name}
 *  getKey={l => l._id || ''}
 * />
 *
 * @example
 * <CustomSelect<Einheit>
 *   name={`${name}[einheit]`}
 *   label={'Einheit'}
 *   options={Object.values(Einheit)}
 *   getLabel={einheit => EinheitProperties[einheit].fullName}
 * />
 */
export function CustomSelect<T>({
                                  name,
                                  label,
                                  multiple = false,
                                  getKey = (v => v as string),
                                  getLabel = (v => v as string),
                                  options = []
                                }: CustomSelectProps<T>): React.ReactElement {

  const [{value}, , helpers] = useField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = options.find(o => getKey(o) === e.target.value)
    await helpers.setValue(newValue);
  }

  return (<Field
    fullWidth
    multiple={multiple}
    as={Select}
    name={name}
    labelId={label}
    value={getKey(value)}
    onChange={handleChange}
  >
    {options.map((option, index) => {
      return <MenuItem key={index} value={getKey(option)}>{getLabel(option)}</MenuItem>
    })}
  </Field>)
}
