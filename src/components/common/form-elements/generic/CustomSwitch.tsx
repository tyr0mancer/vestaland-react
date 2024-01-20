import React from "react";
import {Switch} from "@mui/material";
import {Field, useField} from "formik";

type CustomSwitchProps = {
  name: string,
  label: string,
  color?: string,
  disabled?: boolean
}

/**
 * TS Doc Info
 * @component CustomSwitch
 */
export function CustomSwitch({
                               name,
                               label,
                               color = 'primary',
                               disabled = false
                             }: CustomSwitchProps): React.ReactElement {
  const [{value}] = useField(name);

  return (<Field
    color={color}
    name={name}
    label={label}
    as={Switch}
    checked={value}
    disabled={disabled}
  />)


}
