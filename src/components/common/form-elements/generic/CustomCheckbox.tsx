import React from "react";
import {Field, useField} from "formik";
import {Checkbox, FormControlLabel} from "@mui/material";

import {CustomCheckboxProps} from "./types";


/**
 * Formik Field Komponente für boolesche Werte
 *
 * @example <CustomCheckbox name={`${name}[wartenErforderlich]`} label={'Warten erforderlich?'}/>
 */
export function CustomCheckbox({name, label}: CustomCheckboxProps): React.ReactElement {
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
  />

}
