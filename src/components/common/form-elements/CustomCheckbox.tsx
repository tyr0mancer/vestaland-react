import React from "react";
import {Field, useField} from "formik";
import {Checkbox, FormControlLabel} from "@mui/material";

interface CustomCheckboxProps {
  name: string,
  label: string
}

export function CustomCheckbox({name, label}: CustomCheckboxProps) {
  const [field, , helpers] = useField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await helpers.setValue(e.target.checked);
  };

  return <Field
    type="checkbox"
    name={name}
    as={FormControlLabel}
    control={<Checkbox checked={field.value}/>}
    label={label}
    variant="outlined"
    onChange={handleChange}
    fullWidth
  />

}
