import React from "react";
import {FastField, Field, useField} from "formik";
import {TextField} from "@mui/material";
import {CustomTextFieldProps} from "./types";

/**
 * CustomTextField Komponente - Ein spezialisierter Wrapper um ein Material-UI TextField, integriert mit Formik.
 *
 * @param props - Die Eigenschaften des CustomTextField, definiert in CustomTextFieldProps.
 *
 * @example
 * <CustomTextField
 *   name="email"
 *   label="Email Adresse"
 *   type="email"
 * />
 */
export function CustomTextField({
                                  name,
                                  label,
                                  type = 'text',
                                  fastField = false
                                }: CustomTextFieldProps): React.ReactElement {
  const [, meta] = useField(name);

  if (fastField) return (<FastField as={TextField}
                                type={type}
                                variant={'outlined'}
                                name={name}
                                label={label}
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
  />)

  return (<Field as={TextField}
                 type={type}
                 variant={'outlined'}
                 name={name}
                 label={label}
                 error={meta.touched && !!meta.error}
                 helperText={meta.touched && meta.error}
  />)

}
