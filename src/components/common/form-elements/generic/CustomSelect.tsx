import React from "react";
import {Field, useField} from "formik";
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
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
                                  size = 'medium',
                                  label,
                                  multiple = false,
                                  getKey = (v: T) => v as unknown as string,
                                  getLabel = (v: T) => v as unknown as string,
                                  options = []
                                }: CustomSelectProps<T>): React.ReactElement {

  const [{value}, , {setValue}] = useField<T>(name);

  const handleChange = async (e: SelectChangeEvent<typeof value>) => {
    const newValue = options.find(o => getKey(o) === e.target.value);
    if (newValue)
      await setValue(newValue)
  }

  return (
    <>
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Field
        fullWidth
        multiple={multiple}
        as={Select}
        size={size}
        name={name}
        labelId={`${name}-label`}
        value={getKey(value)}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={getKey(option)}>{getLabel(option)}</MenuItem>
        ))}
      </Field>
    </>
  )
}

