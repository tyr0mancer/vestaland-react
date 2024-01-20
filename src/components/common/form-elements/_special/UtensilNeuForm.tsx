import React, {useEffect, useRef} from "react";
import {Field} from "formik";
import {FormGroup, TextField} from "@mui/material";

interface UtensilNeuFormProps {
  open: boolean
}

/**
 * TS Doc Info
 * @component UtensilNeuForm
 */
export function UtensilNeuForm({open}: UtensilNeuFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open)
      inputRef.current?.focus()
  }, [open])

  return (
    <>
      <FormGroup>
        <Field as={TextField} type="text" variant="outlined"
               inputRef={inputRef}
               name="utensilName" label="Utensil Name"/>

        <Field as={TextField} type="text"
               name="beschreibung" label="Infotext"/>

        <Field as={TextField} type="number"
               name="volumen" label="Füllmenge"/>
      </FormGroup>
    </>)
}
