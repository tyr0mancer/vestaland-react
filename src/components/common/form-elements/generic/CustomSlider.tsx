import React from "react";
import {Field, useField} from "formik";
import {Slider} from "@mui/material";

type CustomSliderProps = {
  name: string,
  label?: string,
  marks?: { value: number, label: string }[],
  defaultValue?: number,
  step?: number,
  min?: number,
  max?: number,
  type: 'number'
}

/**
 * TS Doc Info
 * @component CustomSlider
 */
export function CustomSlider<T = any>({
                                        name,
                                        label,
                                        marks,
                                        defaultValue,
                                        step,
                                        min,
                                        max,
                                        type = 'number'
                                      }: CustomSliderProps): React.ReactElement {

  const [{value}, , {setValue}] = useField<T>(name)

  const handleChange = async (e: any, value: T) => {
    await setValue(value)
  }


  return (<Field as={Slider} type={type} variant="outlined"
                 step={step} min={min} max={max}
                 value={value ?? defaultValue}
                 onChange={handleChange}
                 marks={marks}
                 name={name} label={label}/>
  )
}

