import React from "react";
import {Field} from "formik";
import {TextField} from "@mui/material";

type CustomTextFieldProps = {
  name: string,
  label?: string,
  type?: 'text' | 'number' | 'email',
}

/**
 * TS Doc Info
 * @component CustomTextField
 */
export function CustomTextField({name, label, type = 'text'}: CustomTextFieldProps): React.ReactElement {

  return (<Field as={TextField} type={type} variant="outlined"
                 name={name} label={label}/>
  )
}
