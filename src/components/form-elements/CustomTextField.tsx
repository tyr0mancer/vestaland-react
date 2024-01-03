import {useField} from "formik";
import {TextField} from "@mui/material";
import React from "react";

export const CustomTextField = ({ label, name, ...props }:any) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      margin="normal"
      {...props} // Spread remaining props
    />
  );
};
