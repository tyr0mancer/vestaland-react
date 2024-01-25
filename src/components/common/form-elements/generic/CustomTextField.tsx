import React, {useEffect, useRef} from "react";
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
                                  label = 'name',
                                  type = 'text',
                                  size = 'small',
                                  fastField = false,
                                  defaultValue,
                                  autoComplete = "off",
                                  inputRef,
                                  autoFocus = false,
                                  autoSelect = false,
                                  tabIndex,
                                }: CustomTextFieldProps): React.ReactElement {

  const [{value}, meta, {setValue}] = useField(name);

  //@todo solect instead focus on text field
  if (!inputRef && autoSelect)
    inputRef = useRef<HTMLInputElement>(null);





  useEffect(() => {
    if (value || !defaultValue) return
    setValue(defaultValue).then()
  }, [defaultValue])

  if (fastField) return (<FastField as={TextField}
                                    type={type}
                                    variant={'outlined'}
                                    name={name}
                                    label={label}
                                    error={meta.touched && !!meta.error}
                                    helperText={meta.touched && meta.error}
  />)

  return (<Field as={TextField}
                 autoComplete={autoComplete}
                 autoFocus={autoFocus}
                 type={type}
                 variant={'outlined'}
                 name={name}
                 size={size}
                 label={label}
                 inputRef={inputRef}
                 inputProps={{tabIndex: tabIndex}}
                 error={meta.touched && !!meta.error}
                 helperText={meta.touched && meta.error}
  />)

}
