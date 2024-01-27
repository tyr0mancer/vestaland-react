import React, {useRef} from "react";
import {Field, useField} from "formik";
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
                                  autoComplete = "off",
                                  inputRef,
                                  autoFocus = false,
                                  autoSelect = false,
                                  tabIndex,
                                  multiline = false,
                                  fullWidth = false,
                                  minRows
                                }: CustomTextFieldProps): React.ReactElement {


  //@todo select instead focus on text field
  if (!inputRef && autoSelect)
    inputRef = useRef<HTMLInputElement>(null);

  const [, meta,] = useField(name)


  return (<Field as={TextField}
                 autoComplete={autoComplete}
                 autoFocus={autoFocus}
                 type={type}
                 variant={'outlined'}
                 name={name}
                 size={size}
                 label={label}
                 ref={inputRef}
                 multiline={multiline}
                 minRows={minRows}
                 fullWidth={fullWidth}
                 inputProps={{tabIndex: tabIndex}}
                 error={meta.touched && !!meta.error}
                 helperText={meta.touched && meta.error}

  />)

}
